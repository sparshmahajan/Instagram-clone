import { topics } from "../enums/topics";

export interface UserCreatedEvent {
  topic: topics.UserCreated;
  consumer: string;
  prefix: string;
  data: {
    userId: string;
    email: string;
    username: string;
    profilePicture: string;
  };
}
