import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { BadRequestError, ActionSuccessHandler } from "@instagram-clone/common";
import { UserFollowedProducer } from "../events/producers/userFollowedProducer";

export const followUser = async (req: Request, res: Response) => {
  const { id: userId } = req.user!;
  const { followId } = req.body as { followId: string };

  if (userId === followId) {
    throw new BadRequestError("You cannot follow yourself");
  }

  const userRepository = new UserRepository();

  const result = await userRepository.followUser(userId, followId);

  if (!result) {
    throw new BadRequestError("No user found to follow or already following");
  }

  // Publish event to Kafka
  new UserFollowedProducer().publish({
    userId: userId,
    followId: followId,
  });

  new ActionSuccessHandler(res, "User followed successfully", {}, 201);
};
