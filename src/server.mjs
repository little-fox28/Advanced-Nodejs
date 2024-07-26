import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import * as bodyParser from "express";

import Logger from "./middleware/logger.mjs";
import router from "./routes/routes.mjs";

configDotenv({ path: ".env.production" });

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE;

// Server settings
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser("MEOMEO"));
app.use(
    session({
        secret: "MEOMEO",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
        },
    })
);

// Middleware
app.use(Logger);

// Authentication
app.use(passport.initialize());
app.use(passport.session())

// Router
app.use("/api", router);

mongoose.connect(DATABASE)
    .then(() => {
        console.log("🎁 Database connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server started on port: ${PORT}`);
        });
    });