import User from "../models/User.mjs";

async function FindUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        throw new Error(`[FindUserByEmail]: ${error}`);
    }
}

export default FindUserByEmail;
