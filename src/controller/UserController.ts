import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
import { FetchUsersInputDTO, FetchUsersSchema } from "../dtos/Users/fetchUsers.dto";
import {ZodError} from 'zod'
import { CreateUserSchema } from "../dtos/Users/createUser.dto";
import { UpdateUserSchema } from "../dtos/Users/updateUser.dto";
import { DeleteUserSchema } from "../dtos/Users/deleteUser.dto";

export class UserController {
  constructor(
    private userBusiness: UserBusiness
  ){}
  public fetchUsers = async (req: Request, res: Response) => {
    try {
      const input: FetchUsersInputDTO = FetchUsersSchema.parse({
        nameToSearch: req.query.name as string
      })
      const output = await this.userBusiness.fetchUsers(input)

      res.status(200).send(output);
    } catch (error) {
      if(error instanceof ZodError) {
        res.status(400).send(error.issues)
      }
      else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public createUser = async (req: Request, res: Response) => {
    try {
      const input = CreateUserSchema.parse( {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
      const output = await this.userBusiness.createUser(input);

      res.status(200).send(output);
    } catch (error) {
      if(error instanceof ZodError) {
        res.status(400).send(error.issues)
      }
      else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public updateUser = async (req: Request, res: Response) => {
    try {
      const input = UpdateUserSchema.parse({
        idToEdit: req.params.id,
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
      const output = await this.userBusiness.updateUser(input);

      res.status(200).send(output);
    } catch (error) {
      if(error instanceof ZodError) {
        res.status(400).send(error.issues)
      }
      else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public deleteUser = async (req: Request, res: Response) => {
    try {
      const input = DeleteUserSchema.parse({
        idToDelete: req.params.id,
      });
      const output = await this.userBusiness.deleteUser(input);

      res.status(200).send(output);
    } catch (error) {
      if(error instanceof ZodError) {
        res.status(400).send(error.issues)
      }
      else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
