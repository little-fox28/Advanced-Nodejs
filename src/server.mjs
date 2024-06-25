import express from 'express';
import {configDotenv} from "dotenv";
import cookieParser from "cookie-parser";

import Logger from "./middleware/logger.mjs";
import userRouter from "./routes/userRoutes.mjs";
import productRouter from "./routes/productRoutes.mjs";
import authRouter from "./routes/authRoutes.mjs";
import Authenticate from "./middleware/authentication.mjs";

configDotenv(
    {path: '.env.production'}
);

const app = express();
const PORT = process.env.PORT || 3000;

// Server settings
app.use(express.json());
app.use(cookieParser('MEOMEO'));

// Middleware
app.use(Logger);

// Router
app.use('/api', authRouter);
app.use('/api', Authenticate, userRouter);
app.use('/api', Authenticate, productRouter);


app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});