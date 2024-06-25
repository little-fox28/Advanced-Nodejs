import * as fs from "node:fs";

let mockUser = null

async function fetchMockUser() {
    try {
        const data = fs.readFileSync('src/Database/data.json', 'utf8');
        mockUser = JSON.parse(data)
    } catch (error) {
        console.log("Mock User ERROR:", error)
    }
}

await fetchMockUser();

export default mockUser;