import { Request, Response } from "express";
import { repositories } from "../repositories";
import { ActionSuccessHandler } from "@instagram-clone/common";

export const likePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { id: userId } = req.user!;

  const post = await repositories.like.createLike(userId, postId);

  new ActionSuccessHandler(res, "Post liked successfully", post, 201);
};
