import express from 'express'
import { controllerUser } from '../controller/user'
import { userBusiness } from '../business/user'
import { userDatabase } from '../database/userData'
import { generatorId } from '../service/generatorId'
import { tokenManager } from '../service/tokenManager'
import { hashManager } from '../service/hashManager'

export const userRouter = express.Router()

const userController = new controllerUser(
    new userBusiness(
        new userDatabase (),
        new generatorId(),
        new tokenManager(),
        new hashManager()
    )
)

userRouter.post('/signup', userController.create)
userRouter.get('/', userController.getAllUsers)
userRouter.post('/login', userController.login)