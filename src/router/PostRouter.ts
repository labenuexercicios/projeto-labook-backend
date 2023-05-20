import express from 'express'
import { PostsDatabase} from '../database/PostsDatabase'
import { PostBusiness } from '../business/PostBusiness'
import { PostController } from '../controller/PostController'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostsDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.post("/", postController.createPost)
postRouter.get("/", postController.getPosts)
postRouter.put("/:id", postController.editPostById)
postRouter.put("/:id/like", postController.likeOrDislikePost)
postRouter.delete("/:id", postController.deletePostById)
