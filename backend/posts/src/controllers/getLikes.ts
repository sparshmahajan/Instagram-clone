import { Request, Response } from "express";
import { repositories } from "../repositories";
import { EntriesFoundHandler } from "@instagram-clone/common";

export const getLikes = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const likes = await repositories.like.getUsersWhoLikedPost(postId);

  new EntriesFoundHandler(res, "Likes found", likes);
};
