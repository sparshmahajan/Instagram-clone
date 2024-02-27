import { User, UserAttributes } from "../models/userModel.sequelize";

export class UserRepository {
  async find(filter: {}) {
    return User.findOne({
      where: filter,
    });
  }

  async create(data: UserAttributes) {
    return User.create(data);
  }
}
