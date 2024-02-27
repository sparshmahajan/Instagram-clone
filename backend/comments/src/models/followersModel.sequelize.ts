import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./userModel.sequelize";

interface FollowersAttributes {
  followerId: string;
  followingId: string;
  hidden?: boolean;
}

@Table({
  tableName: "followers",
  modelName: "followers",
  timestamps: false,
})
class Followers extends Model<FollowersAttributes> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: "CASCADE",
  })
  declare followerId: string;

  @BelongsTo(() => User)
  followerUser!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: "CASCADE",
  })
  declare followingId: string;

  @BelongsTo(() => User)
  followingUser!: User;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare hidden: boolean;

  toJSON() {
    return { ...this.get() };
  }
}

export { Followers };
export default Followers;
