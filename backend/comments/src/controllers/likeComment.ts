import { Request, Response } from "express";
import { repositories } from "../repositories";
import { ActionSuccessHandler } from "@instagram-clone/common";

export const likeComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { id: userId } = req.user!;

  await repositories.commentLikes.create({
    commentId: commentId,
    likedBy: userId,
  });

  new ActionSuccessHandler(res, "Comment liked successfully", {}, 200);
};
