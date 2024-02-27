import { Request, Response } from "express";
import { repositories } from "../repositories";
import { ActionSuccessHandler } from "@instagram-clone/common";
import { PostCreatedProducer } from "../events/producers/postCreatedProducer";

export const createPost = async (req: Request, res: Response) => {
  const { caption, posts } = req.body as {
    caption: string;
    posts: {
      type: string;
      url: string;
    }[];
  };

  const userId = req.user!.id;

  const postThread = await repositories.post.createPost({
    caption,
    userId: userId,
    posts,
  });

  //publish an event to kafka
  new PostCreatedProducer().publish({
    userId: postThread.postThread.userId,
    postId: postThread.postThread.id,
  });

  return new ActionSuccessHandler(
    res,
    "Post created successfully",
    postThread,
    201
  );
};
