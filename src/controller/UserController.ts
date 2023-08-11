import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { BaseError } from "../errors/BaseError"
import { ZodError } from "zod"
import { EditUserSchema } from "../dtos/editUser.dtos"

export class UserController {

    constructor(private userBusiness: UserBusiness) { }

    public getUsers = async (req: Request, res: Response) => {
        try {
            const name = req.query.name as string | undefined

            if(name){
              const output = await this.userBusiness.getUsers(name)
              res.status(200).send(output)
            } else {
              const output = await this.userBusiness.getUsers()
              res.status(200).send(output)
            }

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


    public createUser = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const output = await this.userBusiness.createUser(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editUserById = async (req: Request, res: Response) => {
      try {
  
        const input = EditUserSchema.parse({
          idToEdit: req.params.id,
          id: req.body.id,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        })
  
        const output = await this.userBusiness.editUser(input)
  
        res.status(200).send(output)
      } catch (error) {
        console.log(error)
  
        if(error instanceof ZodError ){
          res.status(400).send(error.issues)
        } else if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.status(500).send("Erro inesperado")
        }
      }
    }

    
  public deleteUserById = async (req: Request, res: Response) => {
    try {

      const input = {
        idToDelete: req.params.id
      }

      const output = await this.userBusiness.deleteUser(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

}
