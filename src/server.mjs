import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";

import Logger from "./middleware/logger.mjs";
import router from "./routes/routes.mjs";
import "./strategies/local-strategy.mjs"
import * as bodyParser from "express";
import MongoStore from "connect-mongo";

configDotenv({ path: '.env.production' });

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE;

// Server settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser('MEOMEO'));

app.use(
    session({
        secret: 'MEOMEO',
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
        },
        store: MongoStore.create({
            mongoUrl: DATABASE,
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(Logger);

// Authentication
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use('/api', router);

mongoose.connect(DATABASE)
    .then(() => {
        console.log('🎁 Database connected');

        app.listen(PORT, () => {
            console.log(`🚀 Server started on port: ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });