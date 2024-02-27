import { BadRequestError } from "@instagram-clone/common";
import { Post } from "../models/postModel.sequelize";
import { PostThread } from "../models/postThreadModel.sequelize";
import { User } from "../models/userModel.sequelize";
import Followers from "../models/followersModel.sequelize";

interface PostAttributes {
  caption: string;
  userId: string;
  posts: {
    type: string;
    url: string;
  }[];
}

export class PostRepository {
  async createPost(data: PostAttributes) {
    const { caption, userId, posts } = data;

    const user = await User.findOne({
      where: { userId: userId, deactivated: false, banned: false },
    });

    if (!user) {
      throw new BadRequestError("Invalid user id");
    }

    const postThread = await PostThread.create({
      userId: userId,
      caption,
    });

    const postPromises = posts.map((post, index) => {
      return Post.create({
        threadId: postThread.id,
        type: post.type,
        post: post.url,
        order: index + 1,
      });
    });

    const postsCreated = await Promise.all(postPromises);

    return {
      postThread,
      posts: postsCreated,
    };
  }

  async incrementPostCommentCount(postId: string) {
    const post = await PostThread.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new BadRequestError("Invalid post id");
    }

    return await PostThread.increment(
      { commentsCount: 1 },
      { where: { id: postId } }
    );
  }

  async decrementPostCommentCount(postId: string) {
    const post = await PostThread.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new BadRequestError("Invalid post id");
    }

    return await PostThread.increment(
      { commentsCount: -1 },
      { where: { id: postId } }
    );
  }

  async getFeed(userId: string, limit: number, skip: number) {
    const user = await User.findOne({
      where: { userId, deactivated: false, banned: false },
      attributes: ["userId", "username"],
    });

    if (!user) {
      throw new BadRequestError("Invalid user id");
    }

    const following = await Followers.findAll({
      where: { followerId: userId },
      attributes: ["followingId"],
      include: [
        {
          model: User,
          as: "followingUser",
          attributes: ["userId", "username"],
          where: { deactivated: false, banned: false },
        },
      ],
    });

    const followingIds = following.map((follow) => follow.followingId);
    followingIds.push(userId);

    const feed = await PostThread.findAll({
      where: { userId: followingIds },
      include: [
        {
          model: Post,
          as: "posts",
          attributes: ["id", "type", "post", "order"],
          order: [["order", "ASC"]],
        },
        {
          model: User,
          as: "user",
          attributes: ["userId", "username", "profilePicture"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset: skip,
    });

    return feed;
  }

  async getPostsByUser(userId: string, limit: number, skip: number) {
    const user = await User.findOne({
      where: { userId, deactivated: false, banned: false },
    });

    if (!user) {
      throw new BadRequestError("Invalid user id");
    }

    const posts = await PostThread.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Post,
          as: "posts",
          attributes: ["id", "type", "post", "order"],
          order: [["order", "ASC"]],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset: skip,
    });

    return posts;
  }

  async getPostById(postId: string) {
    const post = await PostThread.findOne({
      where: { id: postId },
      include: [
        {
          model: Post,
          as: "posts",
          attributes: ["id", "type", "post", "order"],
        },
      ],
    });

    if (!post) {
      throw new BadRequestError("Invalid post id");
    }

    return post;
  }
}
