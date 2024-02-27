import { Producer, CommentCreatedEvent, topics } from "@instagram-clone/common";

export class CommentCreatedProducer extends Producer<CommentCreatedEvent> {
  topic: topics.CommentCreated = topics.CommentCreated;
  prefix = process.env.KAFKA_PREFIX!;
}
