import { body } from "express-validator";

export const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  //name only contains alphabets and spaces
  body("name").matches(/^[a-zA-Z ]*$/).withMessage("Invalid name"),
  body("username").notEmpty().withMessage("Username is required"),
  body("username").isLength({ min: 3 }).withMessage("Username is too short"),
  body("username")
    .matches(/^[a-zA-Z0-9_.]*$/)
    .withMessage(
      "Username can only contain letters, numbers, underscores and dots"
    ),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
  body("password").isLength({ min: 8 }).withMessage("Password is too short"),
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  body("mobileNumber").notEmpty().withMessage("Mobile number is required"),
  body("mobileNumber")
    .isMobilePhone("en-IN")
    .withMessage("Invalid mobile number"),
];
