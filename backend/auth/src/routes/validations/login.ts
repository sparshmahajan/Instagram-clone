import { body, oneOf } from "express-validator";

export const loginValidation = [
  body("id").notEmpty().withMessage("ID is required"),
  oneOf([
    body("id").isEmail().withMessage("Invalid email"),
    body("id").isMobilePhone("en-IN").withMessage("Invalid mobile number"),
    body("id").custom((value) => {
      if (!value.match(/^[a-zA-Z0-9_.]*$/)) {
        throw new Error("Invalid Username");
      }
      return true;
    }),
  ]),
  body("password").notEmpty().withMessage("Password is required"),
];