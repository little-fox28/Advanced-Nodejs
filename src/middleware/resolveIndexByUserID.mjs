import mockUsers from "../database/MockUser.mjs";

const resolveIndexByUserID = (req, res, next) => {
    const {params: {id}} = req;

    const uuid = id;

    if (isNaN(uuid)) {
        return res.status(400).json({message: "ID must be a number"});
    }

    const findUserIndex = mockUsers.findIndex(user => user.id === uuid);

    if (findUserIndex === -1) {
        return res.status(400).json({message: "User not found"});
    }

    req.findUserIndex = findUserIndex;
    next();
}

export default resolveIndexByUserID;