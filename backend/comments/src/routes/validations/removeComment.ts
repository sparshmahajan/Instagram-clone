import { param } from "express-validator";

export const removeComment = [param("commentId").isNumeric()];
