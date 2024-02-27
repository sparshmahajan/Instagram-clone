import { Application } from "express";
import { NotFoundError } from "@instagram-clone/common";
import { commentsRoutes } from "./comments.routes";

export default (app: Application) => {
  app.use("/api/comments", commentsRoutes);

  app.use("*", (_req, _res) => {
    throw new NotFoundError("Route not found");
  });
};
