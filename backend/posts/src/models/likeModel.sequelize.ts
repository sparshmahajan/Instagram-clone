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
import { User } from "./userModel.sequelize";

interface likeAttributes {
  id: string;
  userId: string;
  postId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface likeCreationAttributes
  extends Optional<likeAttributes, "id"> {}

@Table({
  tableName: "likes",
  modelName: "like",
  timestamps: true,
})
class Like extends Model<likeAttributes, likeCreationAttributes> {
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
  declare postId: string;

  @BelongsTo(() => PostThread)
  postThread!: PostThread;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare userId: string;

  @BelongsTo(() => User)
  user!: User;
}

export { Like };
export default Like;
