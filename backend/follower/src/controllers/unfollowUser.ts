import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { BadRequestError, ActionSuccessHandler } from "@instagram-clone/common";
import { UserUnfollowedProducer } from "../events/producers/userUnFollowedProducer";

export const unfollowUser = async (req: Request, res: Response) => {
  const { id: userId } = req.user!;
  const { unfollowId } = req.body as { unfollowId: string };

  if (userId === unfollowId) {
    throw new BadRequestError("You cannot unfollow yourself");
  }

  const userRepository = new UserRepository();

  const result = await userRepository.unfollowUser(userId, unfollowId);

  if (!result) {
    throw new BadRequestError("No user found to unfollow or not following");
  }

  // Publish event to Kafka
  new UserUnfollowedProducer().publish({
    userId: userId,
    unfollowId: unfollowId,
  });

  new ActionSuccessHandler(res, "User unfollowed successfully", {}, 201);
};
