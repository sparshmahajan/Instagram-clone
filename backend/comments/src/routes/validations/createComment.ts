import { body } from "express-validator";

export const createComment = [
  body("content").isString().isLength({ min: 1, max: 500 }),
  body("postId").isNumeric(),
  body("replyTo").optional().isNumeric(),
];
