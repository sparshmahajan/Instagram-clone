import { Producer, UserFollowedEvent, topics } from "@instagram-clone/common";

export class UserFollowedProducer extends Producer<UserFollowedEvent> {
  topic: UserFollowedEvent["topic"] = topics.UserFollowed;
  prefix = process.env.KAFKA_PREFIX!;
}
