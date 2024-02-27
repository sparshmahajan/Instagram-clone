import { param } from "express-validator";

export const getFollowers = [
  param("userId").notEmpty().withMessage("User ID is required"),
];
