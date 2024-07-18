import {Router} from 'express';

import {
    CreateUserController,
    GetAllUserController,
    GetUserByEmailController,
    GetUserByNameController,
    UpdateUserByEmailUserController,
    DeleteUserByEmailUserController
} from "../controller/User/userController.mjs";
import {EmailValidation, NameValidation, UserValidation} from "../middleware/validation.mjs";


const userRouter = new Router();

userRouter.post('/create',UserValidation, CreateUserController)
userRouter.get('/', GetAllUserController)
userRouter.post('/email',EmailValidation ,GetUserByEmailController)
userRouter.post('/name',NameValidation ,GetUserByNameController)
userRouter.patch('/',EmailValidation , UpdateUserByEmailUserController)
userRouter.delete('/',EmailValidation ,DeleteUserByEmailUserController)


export default userRouter;