import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";

export class UserController {
  public fetchUsers = async (req: Request, res: Response) => {
    try {
      const q = req.params.q as string | undefined;
      const userBusiness = new UserBusiness();
      const output = await userBusiness.fetchUsers(q);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public createUser = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };
      const userBusiness = new UserBusiness();
      const output = await userBusiness.createUser(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public updateUser = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };
      const userBusiness = new UserBusiness();
      const output = await userBusiness.updateUser(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public deleteUser = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.params.id,
      };
      const userBusiness = new UserBusiness();
      const output = await userBusiness.deleteUser(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
