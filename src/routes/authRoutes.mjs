import {Router} from "express";

import {
    EmailPasswordValidation,
    UserValidation,
} from "../middleware/validation.mjs";
import Register from "../controller/Auth/register.mjs";
import Logout from "../controller/Auth/logout.mjs";
import Login from "../controller/Auth/login.mjs";
import DiscordLogin from "../controller/Auth/discordLogin.mjs";
import passport from "../strategies/discord-strategy.mjs";

const authRouter = new Router();

authRouter.post("/login", EmailPasswordValidation, Login);
authRouter.get("/logout", Logout);
authRouter.post("/register", UserValidation, Register);

authRouter.get("/discord", passport.authenticate('discord'));
authRouter.get("/discord/redirect", passport.authenticate('discord'), DiscordLogin);

export default authRouter;
