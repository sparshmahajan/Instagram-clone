import { topics } from "../enums/topics";

export interface CommentCreatedEvent {
  topic: topics.CommentCreated;
  consumer: string;
  prefix: string;
  data: {
    id: string;
    userId: string;
    postId: string;
    comment: string;
  };
}
