import {Router} from 'express';

import {
    CreateUserController,
    GetAllUserController,
    GetUserByEmailController,
    GetUserByNameController,
    UpdateUserByEmailUserController,
    DeleteUserByEmailUserController
} from "../controller/User/userController.mjs";


const userRouter = new Router();

userRouter.post('/create', CreateUserController)
userRouter.get('/', GetAllUserController)
userRouter.post('/email', GetUserByEmailController)
userRouter.post('/name', GetUserByNameController)
userRouter.patch('/', UpdateUserByEmailUserController)
userRouter.delete('/', DeleteUserByEmailUserController)


export default userRouter;