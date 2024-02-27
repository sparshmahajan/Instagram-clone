import { BadRequestError, NotAuthorizedError } from "@instagram-clone/common";
import {
  CommentLikes,
  CommentLikesCreationAttributes,
} from "../models/commentLikesModel.sequelize";
import { Comment } from "../models/commentModel.sequelize";
import { User } from "../models/userModel.sequelize";

export class CommentLikesRepository {
  async create(data: CommentLikesCreationAttributes) {
    const comment = Comment.findOne({
      where: { id: data.commentId, deleted: false },
    });

    const user = User.findOne({
      where: { userId: data.likedBy, deactivated: false, banned: false },
    });

    const like = await CommentLikes.findOne({
      where: { commentId: data.commentId, likedBy: data.likedBy },
    });

    const [commentExists, userExists, likeExists] = await Promise.all([
      comment,
      user,
      like,
    ]);

    if (!commentExists) {
      throw new BadRequestError("Invalid comment id");
    }

    if (!userExists) {
      throw new BadRequestError("Invalid user id");
    }

    if (likeExists) {
      throw new BadRequestError("User already liked this comment");
    }

    const newLike = await CommentLikes.create(data);
    return newLike;
  }

  async remove(likeId: string, userId: string) {
    const user = await User.findOne({
      where: { userId, deactivated: false, banned: false },
    });
    if (!user) {
      throw new BadRequestError("Invalid user id");
    }

    const commentLike = await CommentLikes.findOne({
      where: { id: likeId },
    });

    if (!commentLike) {
      throw new BadRequestError("Invalid like id");
    }

    if (commentLike.likedBy !== userId) {
      throw new NotAuthorizedError();
    }

    return await CommentLikes.destroy({
      where: { id: likeId },
    });
  }
}
