import { Consumer, UserCreatedEvent, topics } from "@instagram-clone/common";
import { repositories } from "../../repositories";

export class UserCreatedConsumer extends Consumer<UserCreatedEvent> {
  topic: topics.UserCreated = topics.UserCreated;
  consumer: string = "posts-user-created-consumer";
  prefix = process.env.KAFKA_PREFIX!;
  data!: UserCreatedEvent["data"];

  async run() {
    await repositories.user.create(this.data);
    console.log("User created", this.data);
  }
}
