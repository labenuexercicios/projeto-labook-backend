import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { Postcontroller } from "../controller/PostController"
import { UserDatabase } from "../database/UserDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { HashManager } from "../services/HashManager"
import { PostBusiness } from "../business/PostBusiness"
import { PostDatabase } from "../database/PostDatabase"

export const postRouter = express.Router()

const postController = new Postcontroller(
  // new UserBusiness(
  //   new UserDatabase(),
  //   new IdGenerator(),
  //   new TokenManager(),
  //   new HashManager()
  // )
  new PostBusiness(
    new PostDatabase(),
    new TokenManager(),
    new IdGenerator()
  )
)


postRouter.get("/", postController.getPosts)
postRouter.post("/", postController.createPost)

// postRouter.post("/signup", postController.signup)
// postRouter.post("/login", postController.login)