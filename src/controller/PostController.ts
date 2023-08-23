import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { BaseError } from "../errors/BaseError"
import { ZodError } from "zod"
import { EditPostSchema } from "../dtos/Posts/editPost.dto"
import { GetPostsSchema, GetUserPostsSchema } from "../dtos/Posts/getPosts.dto"
import { CreatePostSchema } from "../dtos/Posts/createPost.dto"
import { DeletePostSchema } from "../dtos/Posts/deletePost.dto"

export class PostController {

  constructor(private postBusiness: PostBusiness) { }

  public getPosts = async (req: Request, res: Response) => {

    try {
          const input = GetPostsSchema.parse({
            content: req.query.content,
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
      const input = CreatePostSchema.parse({
        content: req.body.content,
        likes: 0,
        dislikes: 0,
        token: req.headers.authorization
      })

      const output = await this.postBusiness.createPost(input)

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

  public editPostById = async (req: Request, res: Response) => {
    try {

      const input = EditPostSchema.parse({
        content: req.body.content
      })

      const output = await this.postBusiness.editPost(input)

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


  public deletePostById = async (req: Request, res: Response) => {
    try {
      const input = DeletePostSchema.parse({
        idToDelete: req.query.id,
        token: req.headers.authorization
      })

      const output = await this.postBusiness.deletePost(input)

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
