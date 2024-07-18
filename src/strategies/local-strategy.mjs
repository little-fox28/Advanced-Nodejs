import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from "bcryptjs";

import User from "../models/User.mjs";

// Register a new user strategy
export default passport.use(new LocalStrategy(
    {usernameField: "email", passwordField: "password"},
    async (email, password, done) => {
    try {
        const foundUser = await User.findOne({email: email});
        const verifiedPassword = bcrypt.compareSync(password, foundUser.password)

        if (!foundUser) {
            return done(null, false, {message: "User not found"});
        }

        if (!verifiedPassword) {
            return done(null, false, {message: "User incorrect password"});
        }

        return done(null, foundUser);
    } catch (error) {
        return done(null, null, {message: "User not found"});
    }
}));

// Save user in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Get user from session
passport.deserializeUser(async (id, done) => {
    try {
        const foundUser = await User.findOne({_id: id});
        if (!foundUser) {
            return done(new Error("User not found"), null);
        }
        done(null, foundUser);
    } catch (error) {
        done(error, null);
    }
});