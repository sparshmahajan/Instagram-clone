import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import { BadRequestError } from "@instagram-clone/common";
import { ActionSuccessHandler } from "@instagram-clone/common";
import { UserCreatedPublisher } from "../events/publishers/userCreatedPublisher";

export const register = async (req: Request, res: Response) => {
  const { name, bio, username, email, password, mobileNumber, profilePicture } =
    req.body as {
      name: string;
      bio: string;
      username: string;
      email: string;
      password: string;
      mobileNumber: string;
      profilePicture?: string;
    };

  const emailExists = UserRepository.find({ email });
  const usernameExists = UserRepository.find({ username });
  const mobileNumberExists = UserRepository.find({ mobileNumber });

  const [emailExistsResult, usernameExistsResult, mobileNumberExistsResult] =
    await Promise.all([emailExists, usernameExists, mobileNumberExists]);

  if (emailExistsResult) {
    throw new BadRequestError("Email already exists");
  }

  if (usernameExistsResult) {
    throw new BadRequestError("Username already exists");
  }

  if (mobileNumberExistsResult) {
    throw new BadRequestError("Mobile number already exists");
  }

  const user = await UserRepository.create({
    name,
    bio,
    username,
    email,
    password,
    mobileNumber,
    profilePicture,
  });

  new UserCreatedPublisher().publish({
    userId: user.id,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
  });

  return new ActionSuccessHandler(
    res,
    "User created successfully",
    {
      ...user.toJSON(),
    },
    201
  );
};
