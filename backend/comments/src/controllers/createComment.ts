import { Request, Response } from "express";
import { repositories } from "../repositories";
import { ActionSuccessHandler } from "@instagram-clone/common";
import { CommentCreatedProducer } from "../events/producers/commentCreatedProducer";

export const createComment = async (req: Request, res: Response) => {
  const { content, postId, replyTo } = req.body as {
    content: string;
    postId: string;
    replyTo?: string;
  };
  const { id: commentBy } = req.user!;

  console.log(content, postId, replyTo, commentBy);

  const comment = await repositories.comments.create({
    content: content,
    postId,
    commentBy: commentBy,
    replyTo,
  });

  new CommentCreatedProducer().publish({
    id: comment.id,
    userId: comment.commentBy,
    postId: comment.postId,
    comment: comment.content,
  });

  new ActionSuccessHandler(
    res,
    "Comment created successfully",
    { comment },
    201
  );
};
