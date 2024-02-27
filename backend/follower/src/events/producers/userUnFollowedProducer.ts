import { Producer, UserUnfollowedEvent, topics } from "@instagram-clone/common";

export class UserUnfollowedProducer extends Producer<UserUnfollowedEvent> {
  topic: UserUnfollowedEvent["topic"] = topics.UserUnfollowed;
  prefix = process.env.KAFKA_PREFIX!;
}
