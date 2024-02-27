import express from "express";
const router = express.Router();
import { requireAuth, validateRequest } from "@instagram-clone/common";
import { postValidations } from "./validations";
import { postControllers } from "../controllers";

router.post(
  "/",
  requireAuth,
  postValidations.createPost,
  validateRequest,
  postControllers.createPost
);

router.post(
  "/like/:postId",
  requireAuth,
  postValidations.likePost,
  validateRequest,
  postControllers.likePost
);

router.post(
  "/unlike/:postId",
  requireAuth,
  postValidations.unlikePost,
  validateRequest,
  postControllers.unlikePost
);

router.get(
  "/likes/:postId",
  requireAuth,
  postValidations.getLikes,
  validateRequest,
  postControllers.getLikes
);

router.get("/feed", requireAuth, postControllers.getUserFeed);

router.get(
  "/:userId",
  requireAuth,
  postValidations.getUserPosts,
  validateRequest,
  postControllers.getUserPosts
);

router.get("/", requireAuth, postControllers.getOwnPosts);

export { router as postRoutes };
