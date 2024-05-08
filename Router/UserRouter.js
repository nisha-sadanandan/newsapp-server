import  express from 'express';
import { login,getUser,getUserByUserName,addUser,updateUserById,deleteUser} from '../Controllers/userController.js';

const userRouter = express.Router()

userRouter.get('/',getUser)
userRouter.get('/username/:username',getUserByUserName)
userRouter.post('/',addUser)
userRouter.post('/login',login )
userRouter.patch('/:id',updateUserById)
userRouter.delete('/:id',deleteUser)






export default userRouter