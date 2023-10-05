import { Request, Response } from 'express'
import { userBusiness } from '../business/user'
import { baseError } from '../error/baseError'
import { userCreateSchema } from '../endpoints/signup'
import { ZodError } from 'zod'
import { userLoginSchema } from '../endpoints/userLogin'

export class controllerUser {
    constructor(
        private userBusiness: userBusiness
    ){}
    public create= async (req: Request, res: Response): Promise<void> =>{
        try {

            const input = userCreateSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
     
            const output = await this.userBusiness.create(input)

            res.status(201).send(output)

        } catch (error) {
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            }else if (error instanceof baseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("unexpected error.")
            }
        }
    }

    public getAllUsers = async(req: Request, res: Response): Promise<void>=>{
        try {
            const output = await this.userBusiness.getAllUsers()

            res.status(200).send(output)

        } catch (error) {
            console.log(error);
            
            if (error instanceof baseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("unexpected error.")
            }
        }
    }

    public login= async (req: Request, res: Response): Promise<void> =>{
        try {

            const input = userLoginSchema.parse({
                email: req.body.email,
                password: req.body.password
            })

            
            const output = await this.userBusiness.login(input)

            res.status(200).send(output)

        } catch (error) {
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            }else if (error instanceof baseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("unexpected error.")
            }
        }
    }


}