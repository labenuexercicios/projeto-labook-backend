import express from 'express'
import { tokenManager } from '../service/tokenManager'
import { PostController } from '../controller/post'
import { postBusiness } from '../business/post'
import { databasePost } from '../database/postData'
import { generatorId } from '../service/generatorId'


export const postRouter = express.Router()

const postController = new PostController(
    new postBusiness(
        new databasePost(),
        new generatorId(),
        new tokenManager()
        )
)

postRouter.post('/', postController.create)
postRouter.get('/', postController.getAll)
postRouter.put('/:id', postController.update)
postRouter.delete('/:id', postController.delete)
postRouter.put('/:id/like', postController.likeDislike)