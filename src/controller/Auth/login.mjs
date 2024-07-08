import { validationResult } from "express-validator";
import { FindUser } from "../User/userController.mjs";

function Login(req, res) {
    // const anHour = 3.6e+6;
    const error = validationResult(req);
    const { email, password } = req.body;
    const foundUser = FindUser({ email });

    if (!error.isEmpty()) {
        return res.status(400).json({ message: error });
    }

    if (!foundUser || foundUser.password !== password) {
        return res.status(401).json({ message: "User not found!" });
    }

    // res.cookie("loggedIn", "true", {maxAge: anHour, signed: true, secure: true, httpOnly: true})

    req.session.user = { ...foundUser, visited: true };

    return res.status(200).json("Logged in");
}

export default Login;
