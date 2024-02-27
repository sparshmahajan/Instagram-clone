import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Encrypt, Decrypt, getToken } from "@instagram-clone/common";

interface UserAttributes {
  id: string;
  name: string;
  bio: string;
  username: string;
  email: string;
  password?: string;
  mobileNumber: string;
  profilePicture?: string;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
  deactivated?: boolean;
  refreshToken?: string;
  banned?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

@Table({
  tableName: "users",
  modelName: "user",
  timestamps: true,
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare bio: string;

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
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare mobileNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue:
      "https://firebasestorage.googleapis.com/v0/b/instagram-clone-9c0fd.appspot.com/o/profilePictures%2Fblank.png?alt=media&token=9065808a-c018-413a-8a5d-30b7a5b4997e",
  })
  declare profilePicture: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    get() {
      return parseInt(this.getDataValue("followersCount"));
    },
  })
  declare followersCount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    get() {
      return parseInt(this.getDataValue("followingCount"));
    },
  })
  declare followingCount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    get() {
      return parseInt(this.getDataValue("postsCount"));
    },
  })
  declare postsCount: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare deactivated: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  declare refreshToken: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare banned: boolean;

  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await Encrypt(instance.password);
  }

  @BeforeCreate
  static capitalize(instance: User) {
    instance.name = instance.name
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  @BeforeCreate
  static toLowerCase(instance: User) {
    instance.username = instance.username.toLowerCase();
    instance.email = instance.email.toLowerCase();
  }

  comparePassword(password: string) {
    return Decrypt(password, this.password);
  }

  generateToken() {
    return getToken({
      id: this.id,
      email: this.email,
      username: this.username,
    });
  }

  toJSON() {
    const user = { ...this.get() };
    delete user.password;
    delete user.refreshToken;
    delete user.deactivated;
    delete user.banned;
    return user;
  }
}

export { User };
export default User;
