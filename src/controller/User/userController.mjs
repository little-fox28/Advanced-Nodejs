import User from "../../models/User.mjs";

export async function getAllUsers(req, res) {
    try {
        const users = await User.find({});

        if (!users) {
            return res.status(404).json([])
        }

        return res.status(200).json({ users })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// getUserByName
// getUserByEmail
// createUser
// updateUser
// deleteUser