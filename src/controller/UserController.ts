import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { BaseError } from "../errors/BaseError"
import { ZodError } from "zod"
import { EditUserSchema } from "../dtos/Users/editUser.dto"
import { SignupSchema } from "../dtos/Users/signup.dto"
import { LoginSchema } from "../dtos/Users/login.dto"
import { GetUsersSchema } from "../dtos/Users/getUsers.dto"
import { DeleteUserSchema } from "../dtos/Users/deleteUser.dto"
import { ChangeUserRoleSchema } from "../dtos/Users/changeUserRole.dto"

export class UserController {

    constructor(private userBusiness: UserBusiness) { }

    public getUsers = async (req: Request, res: Response) => {
        try {
          const input = GetUsersSchema.parse({
            name: req.query.name,
            token: req.headers.authorization
        })

              const output = await this.userBusiness.getUsers(input)
              res.status(200).send(output)

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

    
    public getUserByName = async (req: Request, res: Response) => {
      try {
        const input = GetUsersSchema.parse({
          name: req.params.name,
          token: req.headers.authorization
      })

            const output = await this.userBusiness.getUserByName(input)
            res.status(200).send(output)

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
  
    public signup = async (req: Request, res: Response) => {

        try {
            const input = SignupSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })

            const output = await this.userBusiness.signup(input)

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

    public login = async (req: Request, res: Response) => {
      try {
        const input = LoginSchema.parse({
          email: req.body.email,
          password: req.body.password
        })
  
        const output = await this.userBusiness.login(input)
  
        res.status(200).send(output)
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
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          token: req.headers.authorization
        })
  
        const output = await this.userBusiness.editUserById(input)
  
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

      const input = DeleteUserSchema.parse({
        idToDelete: req.params.id,
        token: req.headers.authorization
      })

      const output = await this.userBusiness.deleteUserById(input)

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
 
  public editUserRoleById = async (req: Request, res: Response) => {
    try {
  
      const input = ChangeUserRoleSchema.parse({
        idToEdit: req.params.id,
        role: req.body.role,
        token: req.headers.authorization
      })

      const output = await this.userBusiness.editUserRoleById(input)

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
}
