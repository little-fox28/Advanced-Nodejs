import User from "../models/User.mjs";

async function FindUserByEmail(email) {
    try {
        const user = await User.findOne({email: email}, null, null);

        if (!user) {
            return new Error("User not found");
        }

        return user;
    } catch (error) {
        return new Error("Error: Find User By Email");
    }
}

export default FindUserByEmail;
