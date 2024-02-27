import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { PostThread } from "./postThreadModel.sequelize";

interface PostAttributes {
  id: string;
  threadId: string;
  post: string;
  type: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostCreationAttributes
  extends Optional<PostAttributes, "id"> {}

@Table({
  tableName: "posts",
  modelName: "post",
  timestamps: true,
})
class Post extends Model<PostAttributes, PostCreationAttributes> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => PostThread)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare threadId: string;

  @BelongsTo(() => PostThread)
  declare postThread: PostThread;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare post: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare type: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    get() {
      return parseInt(this.getDataValue("order"));
    },
  })
  declare order: number;

  toJSON() {
    return { ...this.get() };
  }
}

export { Post };
export default Post;
