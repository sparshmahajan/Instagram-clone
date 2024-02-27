import { topics } from "../enums/topics";

export interface PostDeletedEvent {
  topic: topics.PostDeleted;
  consumer: string;
  prefix: string;
  data: {
    postId: string;
  };
}
