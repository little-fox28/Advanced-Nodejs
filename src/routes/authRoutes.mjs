import { Router } from "express";
import passport from "passport";

import Login from "../controller/Auth/login.mjs";
import {
    PasswordValidation,
    UserValidation,
} from "../middleware/validation.mjs";
import Authenticate from "../middleware/authentication.mjs";
import Register from "../controller/Auth/register.mjs";
import Logout from "../controller/Auth/logout.mjs";

const authRouter = new Router();

authRouter.post(
    "/login",
    PasswordValidation,
    Login
);
authRouter.get("/logout", Logout);
authRouter.post("/register", UserValidation, Register);

export default authRouter;
