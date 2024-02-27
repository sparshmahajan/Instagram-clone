import { Request, Response } from "express";
import { repositories } from "../repositories";
import { EntriesFoundHandler } from "@instagram-clone/common";

export const getComments = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const comments = await repositories.comments.getComments(postId);

  new EntriesFoundHandler(res, "Comments found", comments);
};
