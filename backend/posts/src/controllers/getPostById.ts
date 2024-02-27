import { Request, Response } from "express";
import { repositories } from "../repositories";
import { EntryFoundHandler } from "@instagram-clone/common";

export const getPostById = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const post = await repositories.post.getPostById(postId);

  new EntryFoundHandler(res, "Post found", post);
};
