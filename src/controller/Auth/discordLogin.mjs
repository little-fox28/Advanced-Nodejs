import passport from "passport";
import "../../strategies/discord-strategy.mjs"

function DiscordLogin(req,res,next) {
    return res.sendStatus(200);
}

export default DiscordLogin