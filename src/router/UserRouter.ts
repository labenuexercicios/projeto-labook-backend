import express from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";
import { IdGenerator } from "../sevices/IdGenerator";
import { TokenManager } from "../sevices/TokenManager";
import { HashManager } from "../sevices/HashManager";

export const userRouter = express.Router();

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager()
  )
);

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.signup);
