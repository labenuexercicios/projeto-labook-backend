import express from "express";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDataBase";

export const postRouter = express.Router();

const postController = new PostController(
  new PostBusiness(new PostDatabase(), new IdGenerator(), new TokenManager())
);

postRouter.get("/", postController.getPosts);
postRouter.post("/", postController.createPost);
postRouter.put("/:id", postController.editPost);
postRouter.delete("/:id", postController.deletePost);
postRouter.put("/:id/like", postController.likePost);
