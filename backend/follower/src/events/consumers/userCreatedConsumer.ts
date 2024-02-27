import { Consumer, UserCreatedEvent, topics } from "@instagram-clone/common";
import userRepository from "../../repositories/user.repository";

export class UserCreatedConsumer extends Consumer<UserCreatedEvent> {
  topic: topics.UserCreated = topics.UserCreated;
  consumer: string = "follower-user-created-consumer";
  prefix = process.env.KAFKA_PREFIX!;
  data!: UserCreatedEvent["data"];

  async run() {
    await userRepository.create(this.data);
    console.log("User created", this.data);
  }
}
