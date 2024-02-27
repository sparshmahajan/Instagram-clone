import { topics } from "../enums/topics";

export interface UserFollowedEvent {
  topic: topics.UserFollowed;
  consumer: string;
  prefix: string;
  data: {
    userId: string;
    followId: string;
  };
}
