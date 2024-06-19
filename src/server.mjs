import express from 'express';
import {configDotenv} from "dotenv";

import Logger from "./middleware/logger.mjs";
import userRouter from "./router/userRoutes.mjs";


configDotenv(
    {path: '.env.production'}
);

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use(Logger);

app.use('/api', userRouter);


app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});