import { Application } from "express";
import { NotFoundError } from "@instagram-clone/common";
import { followRoutes } from "./follow.routes";

export default (app: Application) => {
  app.use("/api/follow", followRoutes);

  app.use("*", (_req, _res) => {
    throw new NotFoundError("Route not found");
  });
};
