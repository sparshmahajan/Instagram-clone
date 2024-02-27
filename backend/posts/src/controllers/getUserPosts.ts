import { Request, Response } from "express";
import { repositories } from "../repositories";
import { EntriesFoundHandler } from "@instagram-clone/common";

export const getUserPosts = async (req: Request, res: Response) => {
  console.log("getUserPosts");
  let { userId } = req.params;
  if (!userId) {
    userId = req.user!.id;
  }

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

  const posts = await repositories.post.getPostsByUser(userId, limit, skip);

  new EntriesFoundHandler(res, "Posts found", posts);
};
