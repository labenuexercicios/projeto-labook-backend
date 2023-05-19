import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { postRouter } from './router/PostRouter'
import { userRouter } from './router/UserRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`)
})

app.use("/posts", postRouter)
app.use("/users", userRouter)

app.get("/ping", async (req: Request, res: Response) => {
    try {
      res.status(200).send({ message: "Pong!" });
    } catch (error) {
      console.log(error);
      if (req.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  });