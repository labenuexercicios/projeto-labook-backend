import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDataBase } from "../database/UserDataBase";
import { SignupInputDTO } from "../dto/userDTO";
import { BaseError } from "../errors/BaseErrors";
import { TUser } from "../models/types";
import { User } from "../models/User";



export class UserController {
    public createUsers = async (req: Request, res: Response) => {
    try{
        const input : SignupInputDTO = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, 
        }

        const userBusiness = new UserBusiness()
        const output = await userBusiness.createUsers(input)
     
            res.status(201).send(output)
    
            }catch (error: any) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }

    public createUsersLogin = async (req: Request, res: Response) => {

        try {
    
            const input = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                created_ad: req.body.role
            }
    
            const userBusiness = new UserBusiness()
            const output = await userBusiness.createUsersLogin(input)
            
            res.status(201).send(output)
    
            }catch (error: any) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }

    public getUsers = async (req: Request, res: Response) => {
        try {
    
            const userBusiness = new UserBusiness()
            const output = await userBusiness.getUsers()
    
            res.status(200).send(output)
    
        }
        catch (error: any) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }
}