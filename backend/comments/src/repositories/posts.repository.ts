import { BadRequestError } from "@instagram-clone/common";
import { Post, PostAttributes } from "../models/postModel.sequelize";
import { User } from "../models/userModel.sequelize";

export class PostRepository {
  async create(data: PostAttributes) {
    const user = await User.findOne({
      where: { userId: data.userId, deactivated: false, banned: false },
    });

    if (!user) {
      throw new BadRequestError("Invalid user id");
    }

    return await Post.create(data);
  }

  async find(filter = {}) {
    return await Post.findOne({
      where: filter,
    });
  }
}
