import { UserRepository } from "./user.repository";
import { PostRepository } from "./posts.repository";
import { FollowersRepository } from "./followers.repository";
import { LikeRepository } from "./like.repository";

export const repositories = {
  user: new UserRepository(),
  post: new PostRepository(),
  followers: new FollowersRepository(),
  like: new LikeRepository(),
};
