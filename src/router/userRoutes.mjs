import {Router} from 'express';

import {
    createUser,
    deleteUser, getAllUser,
    getUserByID,
    getUserByName,
    updateUserByID
} from "../controller/User/userController.mjs";

import resolveIndexByUserID from "../middleware/resolveIndexByUserID.mjs";
import {UserValidation, NameValidation} from "../middleware/validation/inputValidation.mjs";


const userRouter = new Router();

userRouter.get('/users', getAllUser)
userRouter.post('/users', UserValidation, createUser)
userRouter.get('/users/by-name', NameValidation, getUserByName)
userRouter.get('/users/:id', resolveIndexByUserID, getUserByID)
userRouter.patch('/users/:id', resolveIndexByUserID, updateUserByID)
userRouter.delete('/users/:id', resolveIndexByUserID, deleteUser)

export default userRouter;