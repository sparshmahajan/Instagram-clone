import { Application } from "express";
import { NotFoundError } from "@instagram-clone/common";
import { postRoutes } from "./post.routes";

export default (app: Application) => {
  app.use("/api/posts", postRoutes);

  app.use("*", (_req, _res) => {
    throw new NotFoundError("Route not found");
  });
};
