import { Application } from "express";
import { NotFoundError } from "@instagram-clone/common";
import { authRoutes } from "./auth.routes";

export default (app: Application) => {
  app.use("/api/auth", authRoutes);

  app.use("*", (_req, _res) => {
    throw new NotFoundError("Route not found");
  });
};
