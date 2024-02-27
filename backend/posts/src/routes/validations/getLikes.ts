import { param } from "express-validator";

export const getLikes = [
  param("postId").isString().withMessage("PostId is required"),
];
