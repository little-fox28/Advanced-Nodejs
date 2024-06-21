import mockUsers from "../../Database/MockUser.mjs";
import UUID from "../../utils/UUID.mjs";
import {matchedData, validationResult} from "express-validator";

export function createUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;
    const foundUser = mockUsers.find(user => user.email === email);

    if (foundUser) {
        return res.status(409).json({message: "User already exists"});
    }

    const newUser = {id: UUID(), name, email, password}

    mockUsers.push(newUser);
    return res.status(201).json(newUser);
}

export function getAllUser(req, res) {
    const data = matchedData(req)
    console.log(data)

    return res.status(200).json(mockUsers);
}

export function getUserByName(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name} = req.body;
    const foundUser = mockUsers.filter(user => user.name === name);

    if (!foundUser || foundUser.length === 0) {
        return res.status(401).json({message: "User not found"});
    }

    return res.status(200).json(foundUser);
}

export function getUserByID(req, res) {
    const {findUserIndex} = req;

    const foundUser = mockUsers[findUserIndex]

    if (!foundUser) {
        return res.status(401).json({message: "User not found"});
    }

    return res.status(200).json(foundUser);
}

export function updateUserByID(req, res) {
    const {body, findUserIndex} = req;

    const updatedUser = {...mockUsers[findUserIndex], ...body};
    mockUsers[findUserIndex] = updatedUser;

    return res.status(200).json(updatedUser);
}

export function deleteUser(req, res) {
    const {findUserIndex} = req;

    if (findUserIndex === -1) {
        return res.status(404).json({message: "User not found"});
    }

    const [deletedUser] = mockUsers.splice(findUserIndex, 1);

    return res.status(200).json(deletedUser);
}


