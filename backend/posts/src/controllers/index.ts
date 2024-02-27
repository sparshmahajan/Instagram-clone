import { createPost } from "./createPost";
import { likePost } from "./likePost";
import { unlikePost } from "./unlikePost";
import { getLikes } from "./getLikes";
import { getPostById } from "./getPostById";
import { getUserFeed } from "./getUserFeed";
import { getUserPosts } from "./getUserPosts";
import { getOwnPosts } from "./getOwnPosts";

export const postControllers = {
  createPost,
  likePost,
  unlikePost,
  getLikes,
  getPostById,
  getUserFeed,
  getUserPosts,
  getOwnPosts,
};
