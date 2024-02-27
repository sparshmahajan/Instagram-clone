import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import { BadRequestError } from "@instagram-clone/common";
import { ActionSuccessHandler } from "@instagram-clone/common";

export const login = async (req: Request, res: Response) => {
  const { id, password } = req.body as {
    id: string;
    password: string;
  };

  const user = await UserRepository.findByUniqueField(id);

  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new BadRequestError("Invalid credentials");
  }

  req.session = {
    jwt: user.generateToken(),
  };

  return new ActionSuccessHandler(res, "Login successful", {
    ...user.toJSON(),
  });
};
