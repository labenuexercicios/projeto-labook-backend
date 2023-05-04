import express from 'express'
import cors from 'cors'
import { userRouter } from './routers/userRouter'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

//e para outros poderem conectar
app.use(cors())
//e para transformar td q manda e q recebe em objeto
app.use(express.json())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

app.use("/users", userRouter)
app.use("/posts", userRouter)

// app.get("/ping", async (req: Request, res: Response) => {
//     try {
//         res.status(200).send({ message: "Pong!" })
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })