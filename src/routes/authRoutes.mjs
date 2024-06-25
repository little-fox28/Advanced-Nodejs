import {Router} from "express";
import Login from "../controller/Auth/login.mjs";
import Register from "../controller/Auth/register.mjs";
import {PasswordValidation} from "../validation/inputValidation.mjs";

const authRouter = new Router();

authRouter.post('/login', PasswordValidation, Login)
authRouter.post('/register', Register)

export default authRouter;