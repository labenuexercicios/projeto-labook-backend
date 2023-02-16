import express, { Request, Response } from "express"
import cors from "cors"
import { TUser, TPosts, TPostsLike } from "./types";
import { User } from "./User";
import { Post } from "./Post";
import { UserDataBase } from "../database/UserDataBase";
import { PostDataBase } from "../database/PostDataBase";
import { UserController } from "../controller/UserController";
import { PostController } from "../controller/PostController";
import { userRouter } from "../Router/userRouter";
import { postRouter } from "../Router/postRouter";


const app = express()
app.use(cors())
app.use(express.json())


app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
})


app.use("/users", userRouter)

app.use("/posts", postRouter)

