import express from "express"
import { PostController } from "../controller/PostController"

export const postRouter = express.Router()

const postController = new PostController()


postRouter.post("/", postController.createPost)

postRouter.get("/", postController.getPost)

postRouter.put("/:id", postController.updatePost)

postRouter.delete("/:id", postController.deletePost)

// postRouter.put("/:id", postController.updatePostId)