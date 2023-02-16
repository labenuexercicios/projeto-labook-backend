import express from "express"
import { UserController } from "../controller/UserController"

export const userRouter = express.Router()

const userController = new UserController()

userRouter.post("/", userController.createUsers)

userRouter.post("/:login", userController.createUsersLogin)

userRouter.get("/", userController.getUsers)