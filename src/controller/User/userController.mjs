import mockUsers from "../../Database/MockUser.mjs";
import UUID from "../../utils/UUID.mjs";
import {validationResult} from "express-validator";

export function createUser(req, res) {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).send(error)
    }

    const {body} = req;
    const foundUser = mockUsers.find(user =>
        user.email === body.email && user.password === body.password
    );

    if (foundUser) {
        return res.status(201).send({"msg": "User already exists"});
    }

    mockUsers.push({
        id: UUID(),
        name: body.name,
        email: body.email,
        password: body.password,
    })

    return res.status(201).send(mockUsers);
}

export function getAllUser(req, res) {
    return res.status(200).send(mockUsers);
}

export function getUserByName(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).send(error);
    }

    const {body} = req;
    const foundUser = mockUsers.filter(user => user.name === body.name);

    console.log(foundUser)

    if (!foundUser || foundUser.length === 0) {
        return res.status(401).send("User not found");
    }

    return res.status(200).send(foundUser);
}

export function getUserByID(req, res) {
    const {findUserIndex} = req;

    const foundUser = mockUsers[findUserIndex]

    if(!foundUser) {
        return res.status(401).send("User not found");
    }

    return res.status(200).send(foundUser);
}

export function updateUserByID(req, res) {
    const {body, findUserIndex} = req;

    const foundUser = mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body};

    return res.status(200).send(foundUser);
}

export function deleteUser(req, res) {
    const {findUserIndex} = req;

    const deletedUser = mockUsers.splice(findUserIndex, 1);

    return res.status(200).send(deletedUser);
}


