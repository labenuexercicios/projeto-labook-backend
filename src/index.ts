import express from "express";
import cors from "cors";
import { userRouter } from "./Routes/userRouter";
import { postRouter } from "./Routes/postRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => console.log("Server rodando na porta 3003"));

app.use("/users", userRouter)
app.use("/posts", postRouter)



