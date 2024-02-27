import { body } from "express-validator";

export const createPost = [
  body("caption").isString().withMessage("Caption is required"),
  body("posts").isArray().withMessage("Posts is required"),
  body("posts.*.type").isString().withMessage("Type is required"),
  body("posts.*.url").isString().withMessage("Url is required"),
];
