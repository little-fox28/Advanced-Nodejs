import { Router } from "express";

import authRouter from "./authRoutes.mjs";
import userRouter from "./userRoutes.mjs";
import productRouter from "./productRoutes.mjs";
import Authenticate from "../middleware/authentication.mjs";

const router = new Router();

router.use(authRouter);
router.use(Authenticate, userRouter);
router.use(Authenticate, productRouter);


export default router;
