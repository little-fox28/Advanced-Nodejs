import User from "../models/User.mjs";

async function FindUserByEmail(email) {
    try {
        return await User.findOne({email: email});
    } catch (error) {
        return error;
    }
}

export default FindUserByEmail;