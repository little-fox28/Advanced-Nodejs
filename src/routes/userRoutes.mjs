import { Router } from 'express';

import {
    getAllUsers,
    // getUserByName,
    // getUserByEmail,
    // createUser,
    // updateUser,
    // deleteUser,
} from "../controller/User/userController.mjs"

const userRouter = new Router();

userRouter.get('/', getAllUsers);
// userRouter.get('/name', getUserByName);
// userRouter.get('/email', getUserByEmail);
// userRouter.post('/', createUser);
// userRouter.put('/email', updateUser);
// userRouter.delete('/email', deleteUser);

export default userRouter;