import express from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDatabase } from "../database/PostDataBase"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.get("/", postController.getPosts)
postRouter.get("/:id", postController.getPostById)
postRouter.get("/content", postController.getPostsByContent)
postRouter.get("/user/:userId", postController.getUserPosts)
postRouter.post("/", postController.createPost)
postRouter.put("/:id", postController.editPostById)
postRouter.put("/:id/like", postController.likeOrDislikePost)
postRouter.delete("/:id", postController.deletePostById)
