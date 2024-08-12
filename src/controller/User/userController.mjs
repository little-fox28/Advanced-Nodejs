import User from "../../models/User.mjs";
import {CreateNewUser, FindUserByEmail} from "./userService/services.mjs";
import {validationResult} from "express-validator";


export async function CreateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {body} = req;
    try {
        const foundUser = await FindUserByEmail(body.email);

        if (foundUser) {
            return res.sendStatus(500).json({message: "User already exists"});
        }

        const newUser = await CreateNewUser({...body});

        if (!newUser) {
            return res.sendStatus(500).json({message: "Cannot creat user"});
        }

        return res.status(200).json({message: "User created successfully"});
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function GetAllUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const users = await User.find({});
        return res.status(200).json({users});
    } catch (error) {
        return res.sendStatus(500).send(res);
    }
}

export async function GetUserByID(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json({user});
    } catch (error) {
        return res.sendStatus(500);
    }
};

export async function GetUserByEmail(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const foundUser = await FindUserByEmail(req.body.email);

        if (!foundUser) {
            return res.sendStatus(404);
        }

        return res.status(200).json({user: foundUser});
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function GetUserByName(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const foundUsers = await User.find({name: req.body.name});

        if (!foundUsers) {
            return res.sendStatus(500).json({message: "Cannot found user"});
        }

        return res.status(200).json({users: foundUsers});
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function UpdateUserByEmailUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, newEmail, ...updatedUser} = req.body;
    try {
        const foundUser = await FindUserByEmail(email);

        if (!foundUser) {
            return res.status(404).json({message: "User not found"});
        }

        if (newEmail) {
            updatedUser.email = newEmail;
        }

        const userUpdated = await updateUserByEmail(email, updatedUser);

        if (!userUpdated) {
            return res.sendStatus(500).json({message: "User cannot be updated"});
        }

        return res.status(200).json({message: "User updated"});
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function DeleteUserByEmailUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email} = req.body;
    try {
        const foundUser = await FindUserByEmail(email);

        if (!foundUser) {
            return res.status(404).json({message: "User not found"});
        }

        const userDeleted = await User.deleteOne({email: email});

        if (!userDeleted) {
            return res.sendStatus(500).json({message: "User deleted successfully"});
        }

        return res.status(200).json({message: "User deleted"});
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function updateUserByEmail(email, updatedData) {
    try {
        return await User.findOneAndUpdate({email}, {...updatedData, updatedAt: new Date()}, {
            returnOriginal: false, new: true
        });
    } catch (error) {
        throw new Error('Error updating user');
    }
}