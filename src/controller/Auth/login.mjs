import {validationResult} from "express-validator";

import passport from "passport";
import "../../strategies/local-strategy.mjs"

function Login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ message: 'Login successful'});
        });
    })(req, res, next);
}

export default Login;
