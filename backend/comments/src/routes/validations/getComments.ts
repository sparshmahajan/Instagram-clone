import { param } from "express-validator";

export const getComments = [
  param("postId").isLength({ min: 18, max: 18 }).withMessage("Invalid post id"),
];
