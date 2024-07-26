import mongoose from "mongoose";

const DiscordUserSchema = new mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
    }
})

export const DiscordUser = mongoose.model("DiscordUser", DiscordUserSchema)