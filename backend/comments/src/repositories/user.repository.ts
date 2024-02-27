import { User, UserAttributes } from "../models/userModel.sequelize";

export class UserRepository {
  async find(filter = {}) {
    return await User.findOne({
      where: filter,
    });
  }

  async create(data: UserAttributes) {
    return await User.create(data);
  }
}
