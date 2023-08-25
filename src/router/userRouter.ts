import express from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { UserController } from '../controller/UserController'
import { UsersDatabase } from '../database/UsersDatabase'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UsersDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
