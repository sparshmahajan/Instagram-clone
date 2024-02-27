import { param } from "express-validator";

export const likePost = [
  param("postId").isString().withMessage("PostId is required"),
];
