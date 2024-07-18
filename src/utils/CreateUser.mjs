import User from "../models/User.mjs";

async function CreateUser({body}) {
    try {
        const newUser = new User({...body});
        return await newUser.save();
    } catch (error) {
        return error;
    }
}

export default CreateUser;