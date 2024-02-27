import { param } from "express-validator";

export const unlikePost = [
  param("postId").isString().withMessage("PostId is required"),
];
