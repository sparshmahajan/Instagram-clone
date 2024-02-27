import { topics } from "../enums/topics";

export interface CommentDeletedEvent {
  topic: topics.CommentDeleted;
  consumer: string;
  prefix: string;
  data: {
    commentId: string;
    postId: string;
  };
}
