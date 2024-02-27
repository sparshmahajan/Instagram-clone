import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { ActionSuccessHandler } from "@instagram-clone/common";

export const getFollowers = async (req: Request, res: Response) => {
  const { id: userId } = req.user!;

  const userRepository = new UserRepository();

  const followers = await userRepository.getFollowers(userId);

  new ActionSuccessHandler(res, "Followers retrieved successfully", {
    followers,
  });
};
