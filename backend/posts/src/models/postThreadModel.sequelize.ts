import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { User } from "./userModel.sequelize";
import Post from "./postModel.sequelize";

interface PostThreadAttributes {
  id: string;
  userId: string;
  caption: string;
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
  commentsOff?: boolean;
  countHidden?: boolean;
  banned?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostThreadCreationAttributes
  extends Optional<PostThreadAttributes, "id"> {}

@Table({
  tableName: "postthreads",
  modelName: "postthread",
  timestamps: true,
})
class PostThread extends Model<
  PostThreadAttributes,
  PostThreadCreationAttributes
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
  declare userId: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Post)
  posts!: Post[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare caption: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    get() {
      return parseInt(this.getDataValue("likesCount") || 0);
    },
  })
  declare likesCount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    get() {
      return parseInt(this.getDataValue("commentsCount") || 0);
    },
  })
  declare commentsCount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    get() {
      return parseInt(this.getDataValue("sharesCount") || 0);
    },
  })
  declare sharesCount: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare commentsOff: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare countHidden: boolean;

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

export { PostThread };
export default PostThread;
