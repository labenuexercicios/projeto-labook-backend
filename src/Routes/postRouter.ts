import express, { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostDataBase } from "../database/PostDataBase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const postRouter = express.Router();

const postController = new PostController(
  new PostBusiness(
    new PostDataBase(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager()
  )
);

postRouter.get("/", postController.getAllPosts);
postRouter.post("/", postController.createPost);
postRouter.put("/:id", postController.editPost);
postRouter.delete("/:id", postController.deletePost);
