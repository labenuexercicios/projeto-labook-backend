import express from "express";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../database/UserDatabase";
import { UserBusiness } from "../business/UserBusiness";

export const userRouter = express.Router();

const userController = new UserController(
    new UserBusiness(
        new UserDatabase()
    )
);

// iniciando CRUD USERS
userRouter.get("/", userController.fetchUsers);
// Post new user
userRouter.post("/", userController.createUser);
// PUT user ja existente
userRouter.put("/:id", userController.updateUser);
// Delete user existente
userRouter.delete("/:id", userController.deleteUser);
