import express from "express";
const router = express.Router();
import { validateRequest } from "@instagram-clone/common";
import validations from "./validations";
import controllers from "../controllers";

router.post(
  "/register",
  validations.registerValidation,
  validateRequest,
  controllers.register
);

router.post(
  "/login",
  validations.loginValidation,
  validateRequest,
  controllers.login
);

export { router as authRoutes };
