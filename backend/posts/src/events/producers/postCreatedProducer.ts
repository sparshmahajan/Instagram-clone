import { Producer, PostCreatedEvent, topics } from "@instagram-clone/common";

export class PostCreatedProducer extends Producer<PostCreatedEvent> {
  topic: PostCreatedEvent["topic"] = topics.PostCreated;
  prefix = process.env.KAFKA_PREFIX!;
}
