import { BadRequestError } from "@instagram-clone/common";
import { Followers } from "../models/followersModel.sequelize";
import User from "../models/userModel.sequelize";

export class FollowersRepository {
  async createFollower(userId: string, followId: string) {
    const follower = User.findOne({
      where: {
        userId: userId,
        deactivated: false,
        banned: false,
      },
    });
    const following = User.findOne({
      where: {
        userId: followId,
        deactivated: false,
        banned: false,
      },
    });

    const [followerData, followingData] = await Promise.all([
      follower,
      following,
    ]);

    if (!followerData) {
      throw new BadRequestError("Invalid follower id");
    }

    if (!followingData) {
      throw new BadRequestError("Invalid following id");
    }

    return await Followers.create({
      followerId: userId,
      followingId: followId,
    });
  }

  async removeFollower(userId: string, followId: string) {
    const unfollower = User.findOne({
      where: {
        userId: userId,
        deactivated: false,
        banned: false,
      },
    });

    const unfollowing = User.findOne({
      where: {
        userId: followId,
        deactivated: false,
        banned: false,
      },
    });

    const [unfollowerData, unfollowingData] = await Promise.all([
      unfollower,
      unfollowing,
    ]);

    if (!unfollowerData) {
      throw new BadRequestError("Invalid unfollower id");
    }

    if (!unfollowingData) {
      throw new BadRequestError("Invalid unfollowing id");
    }

    return await Followers.destroy({
      where: {
        followerId: userId,
        followingId: followId,
      },
    });
  }
}
