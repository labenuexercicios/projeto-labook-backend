import { Request, Response } from "express";
import { SignupSchema } from "../dtos/Users/signup.dto";
import { UserBusiness } from "../Business/UserBusiness";
import { ZodError } from "zod";
import { BaseError } from "../Errors/BaseError";

export class UserControler {
  constructor(private userBusiness: UserBusiness) {}
  public signup = async (req: Request, res: Response) => {
    try {
      const input = SignupSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const output = await this.userBusiness.signup(input);
      res.status(200).send(output);
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
