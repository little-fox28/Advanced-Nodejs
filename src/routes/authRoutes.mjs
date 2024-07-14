import { Router } from "express";

import {
    EmailPasswordValidation,
    UserValidation,
} from "../middleware/validation.mjs";
import Register from "../controller/Auth/register.mjs";
import Logout from "../controller/Auth/logout.mjs";
import Login from "../controller/Auth/login.mjs";

const authRouter = new Router();

authRouter.post(
    "/login",
    EmailPasswordValidation,
    Login
);
authRouter.get("/logout", Logout);
authRouter.post("/register", UserValidation, Register);

export default authRouter;
