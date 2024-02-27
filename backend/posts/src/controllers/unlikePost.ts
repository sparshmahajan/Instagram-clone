import { Request, Response } from "express";
import { repositories } from "../repositories";
import { ActionSuccessHandler, NotFoundError } from "@instagram-clone/common";

export const unlikePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { id: userId } = req.user!;

  const post = await repositories.like.removeLike(userId, postId);

  new ActionSuccessHandler(res, "Post unliked successfully", post);
};
