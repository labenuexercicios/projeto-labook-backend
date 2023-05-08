import { UserBusiness } from "../business/UserBusiness";
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { SignUpOutputUserDTO, SignUpSchema } from "../dtos/users/SingUpDTO";
import { ZodError } from "zod";
import { LogInOutputDTO, LogInSchema } from "../dtos/users/LogInDTO";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userBusiness.getUsers();
      res.status(200).send(users);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public signUp = async (req: Request, res: Response) => {
    try {
      const input = SignUpSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const output: SignUpOutputUserDTO = await this.userBusiness.signUp(input);

      res.status(201).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public logIn = async (req: Request, res: Response) => {
    try {
      //ToDO
      // const input = LogInSchema.parse({
      //   email: req.body.email,
      //   password: req.body.password,
      // });

      //const token = await this.userBusiness.logIn(input);

      const token = await this.userBusiness.logIn({
        email: req.body.email,
        password: req.body.password,
      });

      const output: LogInOutputDTO = {
        token: token,
      };

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
