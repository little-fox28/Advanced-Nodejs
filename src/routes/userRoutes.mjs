import {Router} from 'express';

import {
    createUser, deleteUser, getAllUser, getUserByID, getUserByName, updateUserByID
} from "../controller/User/userController.mjs";

import resolveIndexByUserID from "../middleware/resolveIndexByUserID.mjs";
import {UserValidation, NameValidation} from "../validation/inputValidation.mjs";


const userRouter = new Router();

userRouter.get('', getAllUser)

userRouter.post('', UserValidation, createUser)

userRouter.post('/by-name', NameValidation, getUserByName)

userRouter.post('/:id', resolveIndexByUserID, getUserByID)

userRouter.patch('/:id', resolveIndexByUserID, updateUserByID)

userRouter.delete('/:id', resolveIndexByUserID, deleteUser)

export default userRouter;