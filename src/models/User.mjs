import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 from the 'uuid' package

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

export default User;
