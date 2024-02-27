import { param } from "express-validator";

export const likeComment = [param("commentId").isNumeric()];
