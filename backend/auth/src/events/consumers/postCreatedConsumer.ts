import { Consumer, PostCreatedEvent, topics } from "@instagram-clone/common";
import userRepository from "../../repositories/user.repository";

export class PostCreatedConsumer extends Consumer<PostCreatedEvent> {
  topic: topics.PostCreated = topics.PostCreated;
  consumer: string = "auth-post-created-consumer";
  prefix = process.env.KAFKA_PREFIX!;
  data!: PostCreatedEvent["data"];

  async run() {
    await userRepository.incrementPostCount(this.data.userId);
    console.log("Post count incremented for user", this.data.userId);
  }
}
