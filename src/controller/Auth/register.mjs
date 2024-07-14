import {validationResult} from "express-validator";
import User from "../../models/User.mjs";

async function Register(req, res) {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({message: error})
    }

    const {body} = req;

    try {
        const foundUser = await User.findOne({email: body.email});

        if (foundUser) {
            return res.status(400).json({message: "user already exists"})
        }

        const newUser = await new User({body});
        await newUser.save();

        return res.status(201).json({message: "User created"});

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export default Register;