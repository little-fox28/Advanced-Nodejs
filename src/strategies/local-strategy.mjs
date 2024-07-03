import passport from "passport";
import LocalStrategy from "passport-local";

import { FindUser } from "../controller/User/userController.mjs";
import mockUser from "../database/MockUser.mjs";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    try {
        const foundUser = mockUser.find((user) => user.id === id);
        if (!foundUser) return new Error("User not found");
        done(null, foundUser)

    } catch (err) {
        done(err, null);
    }
})

passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
        function (email, password, done) {
            try {
                const foundUser = FindUser({ email });
                if (!foundUser) {
                    return done(null, false, { message: 'User not found' });
                }
                if (foundUser.password !== password) {
                    return done(null, false, { message: 'Invalid credentials' });
                }
                return done(null, foundUser);
            } catch (e) {
                return done(e);
            }
        }));
