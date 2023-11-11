import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

// iniciando CRUD USERS
userRouter.get("/", userController.fetchUsers);
// Post new user
userRouter.post("/", userController.createUser);
// PUT user ja existente
userRouter.put("/:id", userController.updateUser);
// Delete user existente
userRouter.delete("/:id", userController.deleteUser);
