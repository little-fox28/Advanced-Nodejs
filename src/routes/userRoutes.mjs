import {Router} from 'express';

import {
    CreateUser,
    GetAllUser,
    GetUserByID,
    GetUserByName,
    GetUserByEmail,
    UpdateUserByEmailUser,
    DeleteUserByEmailUser
} from "../controller/User/userController.mjs";
import {EmailValidation, idValidation, NameValidation, UserValidation} from "../middleware/validation.mjs";


const userRouter = new Router();

userRouter.get('/', GetAllUser)
userRouter.post('/create',UserValidation, CreateUser)
userRouter.post('/name',NameValidation ,GetUserByName)
userRouter.get('/:id', idValidation ,GetUserByID)
userRouter.post('/email',EmailValidation ,GetUserByEmail)
userRouter.patch('/',EmailValidation , UpdateUserByEmailUser)
userRouter.delete('/',EmailValidation ,DeleteUserByEmailUser)


export default userRouter;