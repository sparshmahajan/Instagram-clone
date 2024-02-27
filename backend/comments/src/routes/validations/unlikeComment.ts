import { param } from "express-validator";

export const unlikeComment = [param("commentId").isNumeric()];
