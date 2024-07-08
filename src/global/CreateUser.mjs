import User from "../models/User.mjs";

export async function CreateUser(name, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({name, email, hashedPassword});
        await newUser.save()
        return newUser;
        // mockUsers.push(newUser);
        // await fs.writeFile('src/database/data.json', JSON.stringify(mockUsers, null, 2), "utf8");
    } catch (error) {
        throw new Error(`[CreateUser]: ${error.message}`);
    }
}