import { Consumer, PostCreatedEvent, topics } from "@instagram-clone/common";
import { repositories } from "../../repositories";

export class PostCreatedConsumer extends Consumer<PostCreatedConsumer> {
  topic: topics.PostCreated = topics.PostCreated;
  consumer: string = "comments-post-created-consumer";
  prefix = process.env.KAFKA_PREFIX!;
  data!: PostCreatedEvent["data"];

  async run() {
    await repositories.post.create(this.data);
    console.log("Post created", this.data);
  }
}
