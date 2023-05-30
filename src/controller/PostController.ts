import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { GetUsersSchema } from "../dtos/getUsers.dto"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"
import { LoginSchema } from "../dtos/login.dto"
import { SignupInputDTO, SignupSchema } from "../dtos/signup.dto"
import { GetPostsInputSchema, GetPostsSchema } from "../dtos/getPosts.dto"
import { PostBusiness } from "../business/PostBusiness"

export class Postcontroller {
  constructor(
    private postBusiness: PostBusiness
  ) { }

  public getPosts = async (req: Request, res: Response) => {
    try {
      const input = GetPostsInputSchema.parse({
        // q: req.query.q,
        token: req.headers.authorization
      })

      const output = await this.postBusiness.getPosts(input)

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

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = GetPostsSchema.parse({
        token: req.headers.authorization,
        creatorId: req.body.creatorId,
        content: req.body.content
      })

      const output = await this.postBusiness.createPost(input)
      console.log(output)

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
}