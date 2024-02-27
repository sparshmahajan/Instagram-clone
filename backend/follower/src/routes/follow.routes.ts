import express from "express";
const router = express.Router();
import { requireAuth, validateRequest } from "@instagram-clone/common";
import { followUserValidation } from "./validations";
import { followUserController } from "../controllers";

router.post(
  "/",
  requireAuth,
  followUserValidation.followUser,
  validateRequest,
  followUserController.followUser
);

router.delete(
  "/",
  requireAuth,
  followUserValidation.unfollowUser,
  validateRequest,
  followUserController.unfollowUser
);

router.get("/followers", requireAuth, followUserController.getFollowers);

router.get("/following", requireAuth, followUserController.getFollowing);

export { router as followRoutes };
