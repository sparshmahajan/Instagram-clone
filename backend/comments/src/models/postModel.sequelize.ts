import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./userModel.sequelize";

export interface PostAttributes {
  postId: string;
  userId: string;
  banned?: boolean;
}

@Table({
  tableName: "posts",
  modelName: "posts",
  timestamps: false,
})
class Post extends Model<PostAttributes> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  declare postId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: "CASCADE",
  })
  declare userId: string;

  @BelongsTo(() => User)
  user!: User;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare banned: boolean;

  toJSON() {
    return { ...this.get() };
  }
}

export { Post };
export default Post;
