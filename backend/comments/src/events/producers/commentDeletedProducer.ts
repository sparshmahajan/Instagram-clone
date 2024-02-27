import { Producer, CommentDeletedEvent, topics } from "@instagram-clone/common";

export class CommentDeletedProducer extends Producer<CommentDeletedEvent> {
  topic: CommentDeletedEvent["topic"] = topics.CommentDeleted;
  prefix = process.env.KAFKA_PREFIX!;
}
