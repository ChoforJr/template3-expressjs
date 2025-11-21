import { Router } from "express";
import passport from "passport";
import { authLogin } from "../config/passport.js";

import { addNewUser } from "../controllers/postToDB.js";
import {
  checkSignUpValidationResult,
  validateSignUpRules,
} from "..//validations/validateSignUp.js";
import {
  validateLogInRules,
  checkLoginValidationResult,
} from "..//validations/validateLogIn.js";

const indexRouter = Router();

indexRouter.get("/testCors", (req, res) => {
  res.json({
    message: "it worked",
  });
});

indexRouter.post(
  "/signup",
  validateSignUpRules,
  checkSignUpValidationResult,
  addNewUser
);

indexRouter.post(
  "/login",
  validateLogInRules,
  checkLoginValidationResult,
  authLogin
);

indexRouter.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    // If we are here, the JWT was valid
    res.json({
      message: "You made it to the secure route",
      user: req.user, // This is the decoded token payload
    });
  }
);

export default indexRouter;
