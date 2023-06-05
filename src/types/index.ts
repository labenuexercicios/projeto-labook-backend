import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { userRouter } from "./router/userRouter";
import { postRouter } from "./router/postRouter";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT) || 3003, () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send("pong");
  } catch (error) {
    res.status(400).send("error");
  }
});

app.use("/user", userRouter);

app.use("/posts", postRouter);
