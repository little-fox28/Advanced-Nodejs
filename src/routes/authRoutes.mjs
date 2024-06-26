import { Router } from "express";
import Login from "../controller/Auth/login.mjs";
import Register from "../controller/Auth/register.mjs";
import { PasswordValidation, UserValidation } from "../validation/inputValidation.mjs";
import Logout from "../controller/Auth/logout.mjs";
import Authenticate from "../middleware/authentication.mjs";

const authRouter = new Router();

authRouter.post('/login', PasswordValidation, Login)
authRouter.get('/logout', Logout)
authRouter.post('/register', UserValidation, Register)

export default authRouter;