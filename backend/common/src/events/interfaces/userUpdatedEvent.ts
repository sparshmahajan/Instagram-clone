import { topics } from "../enums/topics";

export interface UserUpdatedEvent {
  topic: topics.UserUpdated;
  consumer: string;
  prefix: string;
  data: {
    userId: string;
    username: string;
    email: string;
    profilePicture: string;
    deactivated: boolean;
    banned: boolean;
  };
}
