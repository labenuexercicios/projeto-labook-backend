import express from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostController } from '../controller/PostController'
import { PostDatabase } from '../database/PostDatabase'
import { UserDatabase } from '../database/UserDatabase'
import { PostDTO } from '../dtos/postDTO'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'


export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new UserDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new PostDTO()
    ), new PostDTO()
)

postRouter.get('/', postController.getPost)

postRouter.post('/', postController.createPost)

