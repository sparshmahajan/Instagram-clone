import { topics } from "../enums/topics";

export interface UserDeletedEvent {
  topic: topics.UserDeleted;
  consumer: string;
  prefix: string;
  data: {
    userId: string;
  };
}
