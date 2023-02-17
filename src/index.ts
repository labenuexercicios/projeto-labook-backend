import {users, posts, likes_dislikes } from "./database/dataBase";
import express, { Request, Response } from 'express'
import { TUsers, TPosts, TLikes_dislikes} from "./types";
import cors from 'cors'
import { UserController } from "./Controller/UserController";
import { userRouter } from "./Router/userRouter";


export class AccountController{
    
}
const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

// const userController= new UserController()
 app.use("/users/signup", userRouter ) 

  




    // try {

    //     const { name, email, password } = req.body

    //     if (typeof name !== "string") {
    //         res.status(201);
    //         throw new Error("'name' deve ser uma string");
    //       }

    //       if (typeof email !== "string") {
    //         res.status(201);
    //         throw new Error("'email' deve ser uma string");
    //       }

    //       if (typeof password !== "string") {
    //         res.status(201);
    //         throw new Error("'password' deve ser uma string");
    //       }

    //     const dbTUsers = {
    //         // id: Id,
    //         name: name,
    //         email: email,
    //         password: password,
    //         // role: role
    //     }

    //     await db("users").insert(dbTUsers) 
    //     const [ usersdb ]: TUsers[] = await db("users")

    
    //     res.status(201).send(dbTUsers)
    // } catch (error) {
    //     console.log(error)

    //     if (req.statusCode === 201) {
    //         res.status(500)
    //     }

    //     if (error instanceof Error) {
    //         res.send(error.message)
    //     } else {
    //         res.send("Erro inesperado")
    //     }

    // }



 


    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // app.post("/users/login", async (req: Request, res: Response) => {
    //     try {
    
    //         const { email, password } = req.body
    
    //           if (typeof email !== "string") {
    //             res.status(200);
    //             throw new Error("'email' deve ser uma string");
    //           }
    
    //           if (typeof password !== "string") {
    //             res.status(200);
    //             throw new Error("'password' deve ser uma string");
    //           }
    //           const dbTUsers = {
    //             email: email,
    //             password: password,
    //         }
    
    //         await db("users").insert(dbTUsers) 
    //         const [ usersdb ]: TUsers[] = await db("users")
    
        
    //         res.status(200).send(dbTUsers)
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
