import { Consumer, UserFollowedEvent, topics } from "@instagram-clone/common";
import userRepository from "../../repositories/user.repository";

export class UserFollowedConsumer extends Consumer<UserFollowedEvent> {
  topic: topics.UserFollowed = topics.UserFollowed;
  consumer: string = "auth-user-followed-consumer";
  prefix = process.env.KAFKA_PREFIX!;
  data!: UserFollowedEvent["data"];

  async run() {
    await userRepository.incrementFollowerAndFollowingCount(
      this.data.userId,
      this.data.followId
    );
    console.log(
      "Follower and following count incremented for user",
      this.data.userId,
      "and user",
      this.data.followId
    );
  }
}
