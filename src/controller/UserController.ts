import { ZodError } from "zod";
import { Request, Response } from "express";
import { SingUpInputDTO, SingUpSchema } from "../DTOs/user/singnUp.dto";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";

import { LoginSchema } from "../DTOs/user/login.dto";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public signUp = async (req: Request, res: Response) => {
    try {
      const input = SingUpSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const result = await this.userBusiness.signUp(input);

      res.status(201).send(result);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado!");
      }
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
        const input = LoginSchema.parse({
            email: req.body.email,
            password: req.body.password
        })

        const result = await this.userBusiness.login(input)

        res.status(200).send(result)

    } catch (error) {
      console.log(error);

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
