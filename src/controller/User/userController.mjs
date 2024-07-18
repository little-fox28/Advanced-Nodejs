import {validationResult} from "express-validator";
import {CreateUser, FindUserByEmail} from "./userService/services.mjs";
import User from "../../models/User.mjs";


export async function CreateUserController(req, res) {
        const {body} = req;
    try {
        const foundUser = await FindUserByEmail(body.email);

        if (foundUser) {
            return res.status(500).json({message: "User already exists"});
        }

        const newUser =  await CreateUser({...body});

        if (!newUser){
            return res.status(500).json({message: "Cannot creat user"});
        }

        return res.status(200).json({message: "User created successfully"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export async function GetAllUserController(req, res) {
    try {
        const users = await User.find({});
        return res.status(200).json({users});
    } catch (error) {
        return res.status(500).send(res.json({error: error.message}));
    }
}

export async function GetUserByEmailController(req, res) {
    try {
        const foundUser = await FindUserByEmail(req.body.email);

        if (!foundUser) {
            return res.status(404).json({message: "Cannot found user"});
        }

        return res.status(200).json({user: foundUser});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export async function GetUserByNameController(req, res) {
    try {
        const foundUsers = await User.find({name: req.body.name});

        if (!foundUsers) {
            return res.status(500).json({message: "Cannot found user"});
        }

        return res.status(200).json({users: foundUsers});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export async function UpdateUserByEmailUserController(req, res) {
    const {email, newEmail,...updatedUser} = req.body;
    try {
        const foundUser = await FindUserByEmail(email);

        if (!foundUser) {
            return res.status(404).json({message: "User not found"});
        }

        if (newEmail){
            updatedUser.email = newEmail;
        }

        const userUpdated = await updateUserByEmail(email,updatedUser);

        if (!userUpdated) {
            return res.status(500).json({message: "User cannot be updated"});
        }

        return res.status(200).json({message: "User updated"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export async function DeleteUserByEmailUserController(req, res) {
        const {email} = req.body;
    try {
        const foundUser = await FindUserByEmail(email);

        if (!foundUser) {
            return res.status(404).json({message: "User not found"});
        }

        const userDeleted = await User.deleteOne({email: email});

        if (!userDeleted) {
            return res.status(500).json({message: "User deleted successfully"});
        }

        return res.status(200).json({message: "User deleted"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

async function updateUserByEmail(email,updatedData) {
    try {
        return await User.findOneAndUpdate(
            { email },
            {...updatedData, updatedAt: new Date() },
            {returnOriginal: false, new: true }
        );
    } catch (error) {
        throw new Error('Error updating user');
    }
}