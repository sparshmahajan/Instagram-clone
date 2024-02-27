import { topics } from "../enums/topics";

export interface PostCreatedEvent {
  topic: topics.PostCreated;
  consumer: string;
  prefix: string;
  data: {
    userId: string;
    postId: string;
  };
}
