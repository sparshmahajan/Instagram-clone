import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { User } from "./userModel.sequelize";
import { Comment } from "./commentModel.sequelize";

interface CommentLikesAttributes {
  id: string;
  commentId: string;
  likedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentLikesCreationAttributes
  extends Optional<CommentLikesAttributes, "id"> {}

@Table({
  tableName: "commentlikes",
  modelName: "commentlikes",
  timestamps: true,
})
class CommentLikes extends Model<
  CommentLikesAttributes,
  CommentLikesCreationAttributes
> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare likedBy: string;

  @BelongsTo(() => User)
  declare likedByUser: User;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare commentId: string;

  @BelongsTo(() => Comment)
  declare comment: Comment;
}

export { CommentLikes };
export default CommentLikes;
