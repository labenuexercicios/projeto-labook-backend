import { UserBusiness } from "../business/UserBusiness";
import { CreateUserSchema } from "../dtos/createUserDTO";
import { Request, Response } from "express"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError";
import { SignupSchema } from "../dtos/user/signupDTO";
import { LoginSchema } from "../dtos/user/loginDTO";

export class UserController {
    constructor (
        private userBusiness: UserBusiness
    ){}

    public signup = async (req:Request, res: Response) => {
        try {
            const input = SignupSchema.parse({
                
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
                
            })
            const output = await this.userBusiness.signup(input)
            res.status(201).send(output)
        } catch (error) {
            console.log(error)
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

    public getUsers = async (req: Request, res: Response) => {
        try {
            const input = {
                q: req.query.q
            }
            const output = await this.userBusiness.getUsers(input)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
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
}