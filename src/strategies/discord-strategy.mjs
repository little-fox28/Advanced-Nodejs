import passport from "passport";
import {configDotenv} from "dotenv";
import {Strategy as DiscordStrategy} from "passport-discord";

import {DiscordUser} from "../models/DiscordUser.mjs";

configDotenv({path: ".env.production"})

passport.serializeUser((user, done) => {
    console.log("[serializeUser]: ", user)
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("[deserializeUser]: Called with id:", id);
    try {
        const foundUser = await DiscordUser.find({_id: id});
        console.log("[deserializeUser]: Found user:", foundUser);
        return foundUser ? done(null, foundUser) : done(null, null);
    } catch (error) {
        console.log("[deserializeUser]: Error:", error.message);
        return done(error.message, null);
    }
});


export default passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'email', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
    let foundUser;

    try {
        foundUser = await DiscordUser.findOne({discordId: profile.id})
    } catch (error) {
        return done(null, null, {error: error});
    }

    try {
        if (!foundUser) {
            const newUser = new DiscordUser({
                discordId: profile.id,
                username: profile.username,
            })
            await newUser.save()
            return done(null, newUser);
        }

        return done(null, profile);
    } catch (error) {
        return done(null, null, {error: error});
    }
}));