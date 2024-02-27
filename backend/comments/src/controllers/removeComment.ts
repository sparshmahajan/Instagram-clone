import { Request, Response } from "express";
import { repositories } from "../repositories";
import { ActionSuccessHandler } from "@instagram-clone/common";
import { CommentDeletedProducer } from "../events/producers/commentDeletedProducer";

export const removeComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { id: userId } = req.user!;

  const comment = await repositories.comments.remove(commentId, userId);

  new CommentDeletedProducer().publish({
    commentId: comment.id,
    postId: comment.postId,
  });

  new ActionSuccessHandler(res, "Comment deleted successfully", {}, 200);
};
