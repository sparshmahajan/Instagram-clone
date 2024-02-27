import express from "express";
const router = express.Router();
import { requireAuth, validateRequest } from "@instagram-clone/common";
import { commentValidators } from "./validations";
import { commentControllers } from "../controllers";

router.post(
  "/",
  requireAuth,
  commentValidators.createComment,
  validateRequest,
  commentControllers.createComment
);

router.delete(
  "/:commentId",
  requireAuth,
  commentValidators.removeComment,
  validateRequest,
  commentControllers.removeComment
);

router.post(
  "/like/:commentId",
  requireAuth,
  commentValidators.likeComment,
  validateRequest,
  commentControllers.likeComment
);

router.delete(
  "/like/:commentId",
  requireAuth,
  commentValidators.unlikeComment,
  validateRequest,
  commentControllers.unlikeComment
);

router.get(
  "/:postId",
  commentValidators.getComments,
  validateRequest,
  commentControllers.getComments
);

export { router as commentsRoutes };
