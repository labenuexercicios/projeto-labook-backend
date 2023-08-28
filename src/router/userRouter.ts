import express from "express"
import { UserController } from "../controller/UserController"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDataBase"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/idGenerator"
import { HashManager } from "../services/HashManager"

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase(), 
        new TokenManager(),
        new IdGenerator(),
        new HashManager()
        )
    )

userRouter.get("/", userController.getUsers)
userRouter.get("/:name", userController.getUserByName)
userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.put("/:id", userController.editUserById)
userRouter.put("/role/:id", userController.editUserRoleById)
userRouter.delete("/:id", userController.deleteUserById)
