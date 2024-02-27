import { Op } from "sequelize";
import { User, UserCreationAttributes } from "../models/userModal.sequelize";
import { InternalServerError } from "@instagram-clone/common";

class UserRepository {
  async find(filter: {}) {
    return User.findOne({
      where: filter,
    });
  }

  async create(data: UserCreationAttributes) {
    return User.create(data);
  }

  async findByUniqueField(field: string) {
    return User.findOne({
      where: {
        [Op.or]: [
          { email: field },
          { username: field },
          { mobileNumber: field },
        ],
      },
    });
  }

  async incrementPostCount(userId: string) {
    await User.increment({ postsCount: 1 }, { where: { id: userId } });
    return;
  }

  async decrementPostCount(userId: string) {
    await User.increment({ postsCount: -1 }, { where: { id: userId } });
    return;
  }

  async incrementFollowerAndFollowingCount(userId: string, followId: string) {
    const t = await User.sequelize!.transaction();
    try {
      await User.increment(
        { followersCount: 1 },
        { where: { id: followId }, transaction: t }
      );
      await User.increment(
        { followingCount: 1 },
        { where: { id: userId }, transaction: t }
      );
      await t.commit();
    } catch (err) {
      await t.rollback();
      console.log(`Error in incrementFollowerAndFollowingCount: ${err}`);
      throw new InternalServerError("Something went wrong");
    }
  }

  async decrementFollowerAndFollowingCount(userId: string, followId: string) {
    const t = await User.sequelize!.transaction();
    try {
      await User.increment(
        { followersCount: -1 },
        { where: { id: followId }, transaction: t }
      );
      await User.increment(
        { followingCount: -1 },
        { where: { id: userId }, transaction: t }
      );
      await t.commit();
    } catch (err) {
      await t.rollback();
      console.log(`Error in decrementFollowerAndFollowingCount: ${err}`);
      throw new InternalServerError("Something went wrong");
    }
  }
}

export default new UserRepository();
