import { param } from "express-validator";

export const getFollowing = [
  param("userId").notEmpty().withMessage("User ID is required"),
];
