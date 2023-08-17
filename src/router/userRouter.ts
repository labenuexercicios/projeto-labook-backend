import express from "express"
import { UserController } from "../controller/UserController"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDataBase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/idGenerator"

export const userRouter = express.Router()



const userController = new UserController(
    new UserBusiness(
        new UserDatabase(), 
        new TokenManager(),
        new IdGenerator()
        )
    )

userRouter.get("/", userController.getUsers)
userRouter.post("/", userController.signup)
userRouter.put("/:id", userController.editUserByEmail)
userRouter.delete("/:id", userController.deleteUserByEmail)
