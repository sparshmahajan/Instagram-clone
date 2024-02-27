import { body } from "express-validator";

export const followUser = [
  body("followId").notEmpty().withMessage("Follow ID is required"),
];
