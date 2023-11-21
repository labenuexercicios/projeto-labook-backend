
import { Request, Response } from 'express'
import { UserBusiness } from '../Business/userBusiness';



export class UserController{


public createUsers = async (req:Request, res:Response)=>{

try{ 
        const {  name, email, password } = req.body
        const core = {
          name, 
          email, 
          password 
      } 

      const userBusiness = new UserBusiness()

      const active = await userBusiness.businessUsers(core)

      res.status(201).send(`created ${active}`)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 201) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
       }

    }}
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
    
    //     }}
    // }
