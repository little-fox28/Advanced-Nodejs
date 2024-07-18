import {validationResult} from "express-validator";

import passport from "../../strategies/local-strategy.mjs";

function Login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({errors});
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(500).json({ message: "User not found" });
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
