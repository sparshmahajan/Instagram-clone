import { param } from "express-validator";

export const getUserPosts = [
  param("userId").isString().withMessage("Invalid user id"),
];
