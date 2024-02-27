import { Consumer, CommentCreatedEvent, topics } from "@instagram-clone/common";
import { repositories } from "../../repositories";

export class CommentCreatedConsumer extends Consumer<CommentCreatedEvent> {
  topic: topics.CommentCreated = topics.CommentCreated;
  consumer: string = "posts-comment-created-consumer";
  prefix = process.env.KAFKA_PREFIX!;
  data!: CommentCreatedEvent["data"];

  async run() {
    await repositories.post.incrementPostCommentCount(this.data.postId);
    console.log("Comment created", this.data);
  }
}
