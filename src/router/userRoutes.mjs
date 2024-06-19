import {Router} from 'express';
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserByID,
    updateUserByID
} from "../controller/User/userController.mjs";
import resolveIndexByUserID from "../middleware/resolveIndexByUserID.mjs";

const userRouter = new Router();

userRouter.post('/users/:id', (req, res) => {
    return res.status(200).send(req.id);
})

userRouter.post('/users', createUser)
userRouter.get('/users', getAllUsers)
userRouter.get('/users/:id',resolveIndexByUserID, getUserByID)
userRouter.patch('/users/:id', resolveIndexByUserID, updateUserByID)
userRouter.delete('/users/:id',resolveIndexByUserID, deleteUser)

export default userRouter;