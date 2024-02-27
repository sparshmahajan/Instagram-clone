import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from "sequelize-typescript";

export interface UserAttributes {
  userId: string;
  username: string;
  email: string;
  profilePicture: string;
  deactivated?: boolean;
  banned?: boolean;
}

@Table({
  tableName: "users",
  modelName: "user",
  timestamps: false,
})
class User extends Model<UserAttributes> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  declare userId: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare profilePicture: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare deactivated: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare banned: boolean;

  @BeforeCreate
  static toLowerCase(instance: User) {
    instance.username = instance.username.toLowerCase();
    instance.email = instance.email.toLowerCase();
  }

  toJSON() {
    const user = { ...this.get() };
    return user;
  }
}

export { User };
export default User;
