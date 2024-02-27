import { Like } from "../models/likeModel.sequelize";
import { PostThread } from "../models/postThreadModel.sequelize";
import { User } from "../models/userModel.sequelize";
import { BadRequestError, InternalServerError } from "@instagram-clone/common";

export class LikeRepository {
  async createLike(userId: string, postId: string) {
    const existingLike = await Like.findOne({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    if (existingLike) {
      throw new BadRequestError("You have already liked this post");
    }

    const postThread = await PostThread.findOne({
      where: {
        id: postId,
        banned: false,
      },
    });
    if (!postThread) {
      throw new BadRequestError("Post not found");
    }

    const t = await PostThread.sequelize!.transaction();
    try {
      postThread.likesCount = postThread.likesCount + 1;
      await postThread.save({ transaction: t });

      await Like.create(
        {
          userId: userId,
          postId: postId,
        },
        { transaction: t }
      );

      await t.commit();

      return postThread.toJSON();
    } catch (error) {
      await t.rollback();
      console.log(`Error in createLike: ${error}`);
      throw new InternalServerError("Something went wrong");
    }
  }

  async removeLike(userId: string, postId: string) {
    const existingLike = await Like.findOne({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    if (!existingLike) {
      throw new BadRequestError("You have not liked this post");
    }

    const postThread = PostThread.findOne({
      where: {
        id: postId,
        banned: false,
      },
    });

    const user = User.findOne({
      where: {
        userId: userId,
        deactivated: false,
        banned: false,
      },
    });

    const [postThreadExists, userExists] = await Promise.all([
      postThread,
      user,
    ]);

    if (!postThreadExists) {
      throw new BadRequestError("Post not found");
    }

    if (!userExists) {
      throw new BadRequestError("User not found");
    }

    const t = await postThreadExists.sequelize!.transaction();
    try {
      postThreadExists.likesCount = postThreadExists.likesCount - 1;
      await postThreadExists.save({ transaction: t });

      await Like.destroy({
        where: {
          userId: userId,
          postId: postId,
        },
        transaction: t,
      });

      await t.commit();

      return postThreadExists.toJSON();
    } catch (error) {
      await t.rollback();
      console.log(`Error in removeLike: ${error}`);
      throw new InternalServerError("Something went wrong");
    }
  }

  async getUsersWhoLikedPost(postId: string) {
    const postThread = await PostThread.findOne({
      where: {
        id: postId,
        banned: false,
      },
    });

    if (!postThread) {
      throw new BadRequestError("Post not found");
    }

    const users = await Like.findAll({
      where: {
        postId: postId,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    return users;
  }
}
