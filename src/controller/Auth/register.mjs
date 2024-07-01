import {validationResult} from "express-validator";
import {CreateUser, FindUser} from "../User/userController.mjs";

async function Register(req, res) {
    const error = validationResult(req);
    const {name, email, password} = req.body;
    const foundUser = FindUser({email})

    if (!error.isEmpty()) {
        return res.status(400).json({message: error})
    }

    if (foundUser) {
        return res.status(400).json({message: "user already exists"})
    }

    await CreateUser(name, email, password)

    res.status(201).json({message: "User created"});
}

export default Register;