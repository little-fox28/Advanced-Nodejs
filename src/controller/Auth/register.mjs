import {validationResult} from "express-validator";
import User from "../../models/User.mjs";
import CreateUser from "../../utils/CreateUser.mjs";

async function Register(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { body } = req;

    try {
        const foundUser = await User.findOne({ email: body.email });

        if (foundUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        await CreateUser({body})

        return res.status(201).json({ message: "User created"});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default Register;