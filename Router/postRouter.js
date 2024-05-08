import express from 'express'
import { upload } from '../upload.js'
import { addPost,getPosts,updatePosts,deletePosts,getImageById} from '../Controllers/postController.js'
import passport from '../passport.js'

const postRouter = express.Router()

postRouter.post('/',passport.authenticate('jwt',{session:false}),
upload.single('image'),addPost)

postRouter.get('/',getPosts)

postRouter.patch('/:id',updatePosts)

postRouter.delete('/:id',deletePosts)

postRouter.get('/images/:id',getImageById)




export default postRouter