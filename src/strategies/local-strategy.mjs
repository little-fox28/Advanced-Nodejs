import passport from "passport";
import { Strategy } from "passport-local";

import { FindUser } from "../controller/User/userController.mjs";
import mockUser from "../database/MockUser.mjs";

// Register a new user
export default passport.use(
    new Strategy(
        { usernameField: "email", passwordField: "password" },
        (email, password, done) => {
            console.log(`email: ${email}`);
            console.log(`password: ${password}`);
            try {
                const foundUser = FindUser(email);
                if (!foundUser) {
                    return done(null, false, { message: "User not found" });
                }
                if (foundUser.password !== password) {
                    return done(null, false, { message: "Invalid credentials" });
                }
                return done(null, foundUser);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Save user in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});
// Get user from session
passport.deserializeUser((id, done) => {
    try {
        const foundUser = mockUser.find((user) => user.id === id);
        if (!foundUser) return new Error("User not found");
        done(null, foundUser);
    } catch (error) {
        done(error, null);
    }
});
