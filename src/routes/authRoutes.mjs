import {Router} from "express";
import passport from "../strategies/discord-strategy.mjs";
// import "../strategies/discord-strategy.mjs"

import {
    EmailPasswordValidation, UserValidation,
} from "../middleware/validation.mjs";
import Register from "../controller/Auth/register.mjs";
import Logout from "../controller/Auth/logout.mjs";
import Login from "../controller/Auth/login.mjs";
import DiscordLogin from "../controller/Auth/discordLogin.mjs";

const authRouter = new Router();

authRouter.get('/status', (req, res) => {
    return req.user ? res.send(req.user) : res.sendStatus(401);
});

authRouter.post("/login", EmailPasswordValidation, Login);
authRouter.get("/logout", Logout);
authRouter.post("/register", UserValidation, Register);

authRouter.get("/discord", passport.authenticate('discord'));
authRouter.get("/discord/redirect", passport.authenticate('discord'), DiscordLogin);

export default authRouter;
