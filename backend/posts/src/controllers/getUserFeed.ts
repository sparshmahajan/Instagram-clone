import { Request, Response } from "express";
import { repositories } from "../repositories";
import { EntriesFoundHandler } from "@instagram-clone/common";

export const getUserFeed = async (req: Request, res: Response) => {
  const { id: userId } = req.user!;

  const limit = req.query.limit
    ? parseInt(req.query.limit as string) > 0
      ? parseInt(req.query.limit as string)
      : 10
    : 10;
  const page = req.query.page
    ? parseInt(req.query.page as string) > 0
      ? parseInt(req.query.page as string)
      : 1
    : 1;

  const skip = (page - 1) * limit;

  const feed = await repositories.post.getFeed(userId, limit, skip);

  new EntriesFoundHandler(res, "Feed found", feed);
};
