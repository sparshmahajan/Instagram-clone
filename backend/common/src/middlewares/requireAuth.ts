import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../handlers/errors";
import { decodeToken } from "../security/jwt";

interface UserPayload {
  id: string;
  email: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.session?.jwt;
  if (!token) {
    throw new NotAuthorizedError();
  }

  const decoded = decodeToken(token) as UserPayload;
  req.user = decoded;
  next();
};
