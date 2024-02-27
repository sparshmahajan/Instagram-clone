import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { ActionSuccessHandler } from "@instagram-clone/common";

export const getFollowing = async (req: Request, res: Response) => {
  const { id: userId } = req.user!;

  const userRepository = new UserRepository();

  const following = await userRepository.getFollowing(userId);

  new ActionSuccessHandler(res, "Following retrieved successfully", {
    following,
  });
};
