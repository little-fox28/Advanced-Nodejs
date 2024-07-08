import { Router } from "express";
import Login from "../controller/Auth/login.mjs";
import Register from "../controller/Auth/register.mjs";
import { PasswordValidation, UserValidation } from "../middleware/validation.mjs";
import Logout from "../controller/Auth/logout.mjs";
import Authenticate from "../middleware/authentication.mjs";
import passport from "passport";

const authRouter = new Router();

authRouter.post('/login', PasswordValidation, passport.authenticate('local'), Login)
authRouter.get('/logout', Logout)
authRouter.post('/register', UserValidation, Register)

export default authRouter;