import { Consumer, CommentDeletedEvent, topics } from "@instagram-clone/common";
import { repositories } from "../../repositories";

export class CommentDeletedConsumer extends Consumer<CommentDeletedEvent> {
  topic: topics.CommentDeleted = topics.CommentDeleted;
  consumer: string = "posts-comment-deleted-consumer";
  prefix = process.env.KAFKA_PREFIX!;
  data!: CommentDeletedEvent["data"];

  async run() {
    await repositories.post.decrementPostCommentCount(this.data.postId);
    console.log("Comment deleted", this.data);
  }
}
