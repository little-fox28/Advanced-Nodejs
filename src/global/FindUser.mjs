import User from "../models/User.mjs";

export async function FindUser(email) {
    try {
        if (typeof email !== 'string') {
            return new Error('Email must be a string');
        }
        const user = await User.findOne({email: email}, null, null);
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}