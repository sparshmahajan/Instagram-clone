import { Consumer, UserUnfollowedEvent, topics } from "@instagram-clone/common";
import userRepository from "../../repositories/user.repository";

export class UserUnfollowedConsumer extends Consumer<UserUnfollowedConsumer> {
  topic: topics.UserUnfollowed = topics.UserUnfollowed;
  consumer: string = "auth-user-unfollowed-consumer";
  prefix = process.env.KAFKA_PREFIX!;
  data!: UserUnfollowedEvent["data"];

  async run() {
    await userRepository.decrementFollowerAndFollowingCount(
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
