import express from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDatabase } from "../database/PostDataBase"

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase()
    )
)

postRouter.get("/", postController.getPosts)
postRouter.post("/", postController.createPost)
postRouter.put("/:id", postController.editPostById)
postRouter.delete("/:id", postController.deletePostById)
