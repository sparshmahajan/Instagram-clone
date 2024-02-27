import { Consumer, UserUnfollowedEvent, topics } from "@instagram-clone/common";
import { repositories } from "../../repositories";

export class UserUnfollowedConsumer extends Consumer<UserUnfollowedEvent> {
  topic: topics.UserUnfollowed = topics.UserUnfollowed;
  consumer: string = "comments-user-unfollowed-consumer";
  prefix = process.env.KAFKA_PREFIX!;
  data!: UserUnfollowedEvent["data"];

  async run() {
    await repositories.followers.removeFollower(
      this.data.userId,
      this.data.unfollowId
    );
    console.log(
      "Follower and following count decremented for user",
      this.data.userId,
      "and user",
      this.data.unfollowId
    );
  }
}
