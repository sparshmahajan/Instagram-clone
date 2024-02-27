import { Request, Response } from "express";
import { repositories } from "../repositories";
import { ActionSuccessHandler } from "@instagram-clone/common";

export const unlikeComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { id: userId } = req.user!;

  await repositories.commentLikes.remove(commentId, userId);

  new ActionSuccessHandler(res, "Comment unliked successfully", {}, 200);
};
