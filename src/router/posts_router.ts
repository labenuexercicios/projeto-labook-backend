import express from "express";
import { PostsController } from "../controller/posts_controller";
import { PostsBusiness } from "../business/post_business";
import { PostsDatabase } from "../database/post_database";
import { IdGenerator } from "../service/id_generator";
import { TokenManager } from "../service/token_manager";
import { UserDatabase } from "../database/users_database";
export const postsRouter = express.Router();
const postsController = new PostsController(
  new PostsBusiness(
    new PostsDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new UserDatabase()
  )
);

postsRouter.post("/", postsController.createPost);
postsRouter.get("/", postsController.getPosts);
postsRouter.put("/:id", postsController.editPosts);
postsRouter.delete("/:id", postsController.deletePost);

postsRouter.put("/:id/like", postsController.likeDislike)