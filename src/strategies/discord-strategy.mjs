import passport from "passport";
import {configDotenv} from "dotenv";
import {Strategy} from "passport-discord";

import {DiscordUser} from "../models/DiscordUser.mjs";

configDotenv({ path: ".env.production"})

passport.use(new Strategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'email', 'guilds']
},async (accessToken, refreshToken, profile, done) => {

    const findUser = await DiscordUser.findOne({discordId: profile.id});

    if (!findUser) {
        const newUser = await DiscordUser.create({
            discordId: profile.id,
            username: profile.username,
        });
        return done(null, newUser);
    }

    return done(null,profile)
}));

// Serialize user info into session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user info from session
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

export  default passport;