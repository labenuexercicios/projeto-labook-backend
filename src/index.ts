import express from 'express'
import cors from 'cors'
import { userRouter } from './router/users_router'
import { postsRouter } from './router/posts_router'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.use("/users", userRouter)
app.use("/posts", postsRouter)