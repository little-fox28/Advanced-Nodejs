import User from "../../../models/User.mjs";

async function CreateNewUser(body) {
    try {
        const newUser = new User({...body});
        return await newUser.save()
    } catch (error) {
        return error.message;
    }
}

async function FindUserByEmail(email) {
    try {
        const foundUser = await User.findOne({email: email});
        if (!foundUser) {
            return null;
        }
        return foundUser;
    } catch (error) {
        return error.message;
    }
}

export {CreateNewUser,FindUserByEmail}