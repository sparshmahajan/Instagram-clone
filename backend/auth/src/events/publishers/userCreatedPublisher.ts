import { Producer, UserCreatedEvent, topics } from "@instagram-clone/common";

export class UserCreatedPublisher extends Producer<UserCreatedEvent> {
  topic: UserCreatedEvent["topic"] = topics.UserCreated;
  prefix = process.env.KAFKA_PREFIX!;
}
