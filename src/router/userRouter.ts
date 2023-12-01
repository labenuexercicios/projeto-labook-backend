import express from 'express'
import { UserDatabase } from '../database/UserDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { TokenManager } from '../services/TokenManager'
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/UserBussiness'

export const userRouter = express.Router()

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager()
  )
)

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)