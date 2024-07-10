import User from "../models/User.mjs";

async function CreateUser(name, email, password) {
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error(`[CreateUser]: ${error.message}`);
    }
}

export default CreateUser;