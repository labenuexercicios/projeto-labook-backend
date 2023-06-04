import express   from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './router/userRouter'
import { postRouter } from './router/postRouter'
import { likeDislikeRouter } from './router/LikeDislikeRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`);
  });

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/posts", likeDislikeRouter)

