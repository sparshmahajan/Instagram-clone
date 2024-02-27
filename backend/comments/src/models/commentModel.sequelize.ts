import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Optional, Sequelize } from "sequelize";
import { User } from "./userModel.sequelize";
import { Post } from "./postModel.sequelize";

interface CommentAttributes {
  id: string;
  commentBy: string;
  postId: string;
  content: string;
  replyTo?: string | null;
  likes?: number;
  pinned?: boolean;
  hidden?: boolean;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentCreationAttributes
  extends Optional<CommentAttributes, "id"> {}

@Table({
  tableName: "comments",
  modelName: "comment",
  timestamps: true,
})
class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
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
  declare commentBy: string;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare postId: string;

  @BelongsTo(() => Post)
  declare post: Post;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare content: string;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  declare replyTo: string | null;

  @BelongsTo(() => Comment, {
    foreignKey: "replyTo",
  })
  declare reply: Comment;

  @HasMany(() => Comment, {
    foreignKey: "replyTo",
  })
  declare replies: Comment[];

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    get() {
      return parseInt(this.getDataValue("likes"));
    },
  })
  declare likes: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare pinned: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare hidden: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare deleted: boolean;
}

export { Comment };
export default Comment;
