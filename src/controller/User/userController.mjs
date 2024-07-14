import { promises as fs } from "fs";

import mockUsers from "../../database/MockUser.mjs";
import UUID from "../../utils/UUID.mjs";
import { validationResult } from "express-validator";

export async function createUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const foundUser = FindUser({ email });

    if (foundUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    await CreateUser(name, email, password);

    return res.status(201).json({ message: "User created" });
}

export function getAllUser(req, res) {
    req.sessionStore.get(req.sessionID, (err) => {
        if (err) {
            throw err
        }
    })
        return res.status(200).json(mockUsers);

}

export function getUserByName(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const foundUser = mockUsers.filter(user => user.name === name);

    if (!foundUser || foundUser.length === 0) {
        return res.status(401).json({ message: "User not found" });
    }

    return res.status(200).json(foundUser);
}

export function getUserByID(req, res) {
    const { findUserIndex } = req;

    const foundUser = mockUsers[findUserIndex];

    if (!foundUser) {
        return res.status(401).json({ message: "User not found" });
    }

    return res.status(200).json(foundUser);
}

export async function updateUserByID(req, res) {
    const { body, findUserIndex } = req;

    try {
        const updatedUser = { ...mockUsers[findUserIndex], ...body };
        mockUsers[findUserIndex] = updatedUser;

        await fs.writeFile('src/database/data.json', JSON.stringify(mockUsers));

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function deleteUser(req, res) {
    const { findUserIndex } = req;

    try {
        if (findUserIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        const [deletedUser] = mockUsers.splice(findUserIndex, 1);

        await fs.writeFile('src/database/data.json', JSON.stringify(mockUsers));

        return res.status(200).json({ message: "User deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

export function FindUser(email) {
    return mockUsers.find(user => user.email === email);
}

export async function CreateUser(name, email, password) {
    try {
        const newUser = { id: UUID(), name, email, password };
        mockUsers.push(newUser);

        await fs.writeFile('src/database/data.json', JSON.stringify(mockUsers, null, 2), "utf8");
    } catch (error) {
        throw new Error(`[CreateUser]: ${error.message}`);
    }
}