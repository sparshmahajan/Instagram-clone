import { topics } from "../enums/topics";

export interface UserUnfollowedEvent {
  topic: topics.UserUnfollowed;
  consumer: string;
  prefix: string;
  data: {
    userId: string;
    unfollowId: string;
  };
}
