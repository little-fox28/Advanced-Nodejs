import mockUsers from "../../Database/MockUser.mjs";
import UUID from "../../utils/UUID.mjs";

export function createUser(req, res) {

    const {name, email, password} = req.body;

    const foundUer = mockUsers.find(user => user.email === email && user.password === password);

    if (foundUer) {
        return res.status(201).send({"msg": "User already exists"});
    }


    if (!name || !email || !password || !name.trim()) {
        return res.status(400).json({"msg": "Please enter a valid input."});
    }

    mockUsers.push({
        id: UUID(), name, email, password,
    })

    return res.status(201).send(mockUsers);

}

export function getAllUsers(req, res) {
    return res.status(200).send(mockUsers);
}

export function getUserByID(req, res) {
    const {findUserIndex} = req;

    return res.status(200).send(mockUsers[findUserIndex]);
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


