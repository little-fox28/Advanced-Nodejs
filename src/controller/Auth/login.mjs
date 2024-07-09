import { validationResult } from "express-validator";

import { FindUser } from "../User/userController.mjs";
import passport from "passport";

function Login(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    // // const anHour = 3.6e+6;
    // const { email, password } = req.body;
    // const foundUser = FindUser(email);

    // if (!foundUser || foundUser.password !== password) {
    //     return res.status(401).json({ message: "User not found!" });
    // }

    // // res.cookie("loggedIn", "true", {maxAge: anHour, signed: true, secure: true, httpOnly: true})

    // // req.session.user = { ...foundUser, visited: true };

    // req.logIn(foundUser, function (error) {
    //     if (error) {
    //         return res.status(401).json({ error: error });
    //     }
    //     return res.status(200).json("Logged in");
    // })

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(401).json({ error: err });
        }
        if (!user) {
            return res.status(401).json({ message: info ? info.message : 'Login failed' });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(401).json({ error: err });
            }
            return res.status(200).json("Logged in");
        });
    })(req, res, next);
}

export default Login;
