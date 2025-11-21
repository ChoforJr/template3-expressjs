import { Router } from "express";
import passport from "passport";

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
  "/sign-up",
  validateSignUpRules,
  checkSignUpValidationResult,
  addNewUser
);

indexRouter.post(
  "/log-in",
  validateLogInRules,
  checkLoginValidationResult,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default indexRouter;
