import { UserRepository } from "./user.repository";
import { PostRepository } from "./posts.repository";
import { FollowersRepository } from "./followers.repository";
import { CommentRepository } from "./comments.repository";
import { CommentLikesRepository } from "./commentLikes.repositiory";

export const repositories = {
  user: new UserRepository(),
  post: new PostRepository(),
  followers: new FollowersRepository(),
  comments: new CommentRepository(),
  commentLikes: new CommentLikesRepository(),
};
