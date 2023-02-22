import { Request, Response } from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { LoginInput, SignupInput } from "../dtos/usersDTO";

export class UsersController {
  constructor(private userBusiness: UsersBusiness) {}

  public getUsers = () => {};

  public login = async (req: Request, res: Response) => {
    try {
        const input: LoginInput = {
            email: req.body.email,
            password: req.body.password
        }

        const output = await this.userBusiness.login(input)

        res.status(200).send(output)

    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public signup = async (req: Request, res: Response) => {
    try {
      const input: SignupInput = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      const output = await this.userBusiness.signup(input);

      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
}
