import { body } from "express-validator";
const isNumeric = (value) => {
  // Custom logic to check if the value contains at least 3 numeric characters
  const numericCount = (value.match(/[0-9]/g) || []).length;
  return numericCount >= 3;
};
const hasUpperCase = (value) => {
  return /[A-Z]/.test(value);
};
export const loginValidation = [
  body("password", "You password not strong enough, add uppercase and numbers")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .custom(hasUpperCase)
    .withMessage("Password must contain at least 1 uppercase letter")
    .custom(isNumeric)
    .withMessage("Password must contain at least 3 numeric characters"),
  body("username", "Name must be at least 6 symbols").isLength({
    min: 6,
  }),
];

export const registerValidation = [
  body("email", "Wrong type of email").isEmail(),
  body("password", "You password not strong enough, add uppercase and numbers")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .custom(hasUpperCase)
    .withMessage("Password must contain at least 1 uppercase letter")
    .custom(isNumeric)
    .withMessage("Password must contain at least 3 numeric characters"),
  body("username", "Name must be at least 6 symbols").isLength({ min: 6 }),
];
