import { body } from "express-validator";

export const unfollowUser = [
  body("unfollowId").notEmpty().withMessage("Unfollow ID is required"),
];
