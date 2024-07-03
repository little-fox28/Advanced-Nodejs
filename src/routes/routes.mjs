import {Router} from "express";

import authRouter from "./authRoutes.mjs";
import userRouter from "./userRoutes.mjs";
import Authenticate from "../middleware/authentication.mjs";
import passport from "passport";

const router = new Router();

router.use('/auth', authRouter);
router.use('/users', Authenticate, userRouter);

export default router;
