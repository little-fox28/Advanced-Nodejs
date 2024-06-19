import mockUsers from "../Database/MockUser.mjs";

const resolveIndexByUserID = (req, res, next) => {
    const {params: {id}} = req;

    const uuid = parseInt(id);


    if (isNaN(uuid)) {
        return res.sendStatus(400)
    }

    const findUserIndex = mockUsers.findIndex(user => user.id === uuid);

    if (findUserIndex < 0) {
        return res.sendStatus(400).send({"msg": "User not found"});
    }

    req.findUserIndex = findUserIndex;
    next();
}

export default resolveIndexByUserID;