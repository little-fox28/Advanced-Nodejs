import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";

import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import router from "./routes/routes.mjs";
// import "./strategies/local-strategy.mjs"
import "./strategies/discord-strategy.mjs"
import Logger from "./middleware/logger.mjs";

configDotenv({ path: '.env.production' });

const app = express();
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT || 3000;

// Server settings
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser('MEOMEO'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    session({
        resave: false,
        secret: 'MEOMEO',
        saveUninitialized: true,
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

// Router
app.use('/api', router);

mongoose.connect(DATABASE)
    .then(() => {
        console.log('🎁 Database connected');

        app.listen(PORT, () => {
            console.log(`🚀 Server started on port: ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });
