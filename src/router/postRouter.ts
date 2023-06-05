import express from "express";
import { PostBusiness } from "../business/PostBusiness";
import {PostController } from "../controller/PostController";
import { PostDataBase } from "../database/PostDataBase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const postRouter = express.Router();

const postController = new PostController(
  new PostBusiness(new PostDataBase(), new IdGenerator(), new TokenManager())
);

postRouter.get("/", postController.getPost);
postRouter.post("/", postController.createPost);
postRouter.put("/:id", postController.editPost);
postRouter.put("/:id/like", postController.likeOrDislikePost);
postRouter.delete("/:id", postController.deletePost);
