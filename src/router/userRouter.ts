import express from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { UserDatabase } from '../database/UserDataBase'
import { UserController } from '../controller/UserController'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { HashManager } from '../services/HashManager'

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
     new UserDatabase(),
     new IdGenerator(),
     new TokenManager(),
     new HashManager()
    )
)

userRouter.post("/singup", userController.signUp)
userRouter.get("/login", userController.login)

