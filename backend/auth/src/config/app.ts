import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import logger from "morgan";
import indexRoutes from "../routes/index.routes";
import { errorHandler } from "@instagram-clone/common";

const app = express();
app.set("trust proxy", true);
app.use(cors({ credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

indexRoutes(app);
app.use(errorHandler);

export { app };
