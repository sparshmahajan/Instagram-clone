import { BadRequestError } from "@instagram-clone/common";
import {
  Comment,
  CommentCreationAttributes,
} from "../models/commentModel.sequelize";
import { User } from "../models/userModel.sequelize";
import { Post } from "../models/postModel.sequelize";
import CommentLikes from "../models/commentLikesModel.sequelize";

export class CommentRepository {
  async create(data: CommentCreationAttributes) {
    const user = User.findOne({
      where: { userId: data.commentBy, deactivated: false, banned: false },
    });

    const post = Post.findOne({
      where: { postId: data.postId, banned: false },
    });

    if (data.replyTo) {
      const reply = await Comment.findOne({
        where: { id: data.replyTo, deleted: false },
      });

      if (!reply) {
        throw new BadRequestError("Invalid replyTo comment id");
      }
    }

    const [userExists, postExists] = await Promise.all([user, post]);

    if (!userExists) {
      throw new BadRequestError("Invalid user id");
    }

    if (!postExists) {
      throw new BadRequestError("Invalid post id");
    }

    const comment = await Comment.create(data);
    return comment;
  }

  async remove(commentId: string, userId: string) {
    const user = await User.findOne({
      where: { userId, deactivated: false, banned: false },
    });

    if (!user) {
      throw new BadRequestError("Invalid user id");
    }

    const comment = await Comment.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new BadRequestError("Invalid comment id");
    }

    if (comment.commentBy !== userId) {
      throw new BadRequestError(
        "You are not authorized to delete this comment"
      );
    }

    await CommentLikes.destroy({
      where: { commentId },
    });

    await Comment.update(
      { deleted: true },
      {
        where: { id: commentId },
      }
    );
    return comment;
  }

  async getComments(postId: string) {
    const comments = await Comment.findAll({
      where: { postId, deleted: false },
      //create tree structure
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          as: "replies",
          where: { deleted: false },
          // hierarchy: true,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });

    return comments;
  }
}
