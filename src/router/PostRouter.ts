import express from "express";
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { PostDatabase } from "../database/PostDatabase";
import { IdGenerator } from "../sevices/IdGenerator";
import { TokenManager } from "../sevices/TokenManager";
import { HashManager } from "../sevices/HashManager";

export const postRouter = express.Router();
const postController = new PostController(
  new PostBusiness(new PostDatabase(), new IdGenerator(), new TokenManager())
);

postRouter.get("/", postController.getPosts);
// postRouter.post("/", postController.)
