import { Consumer, UserFollowedEvent, topics } from "@instagram-clone/common";
import { repositories } from "../../repositories";

export class UserFollowedConsumer extends Consumer<UserFollowedEvent> {
  topic: topics.UserFollowed = topics.UserFollowed;
  consumer: string = "posts-user-followed-consumer";
  prefix = process.env.KAFKA_PREFIX!;
  data!: UserFollowedEvent["data"];

  async run() {
    await repositories.followers.createFollower(
      this.data.userId,
      this.data.followId
    );
    console.log("User followed", this.data.userId, this.data.followId);
  }
}
