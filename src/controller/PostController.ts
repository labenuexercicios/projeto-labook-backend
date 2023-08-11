import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { BaseError } from "../errors/BaseError"
import { ZodError } from "zod"
import { EditPostSchema } from "../dtos/editPost.dtos"

export class PostController {

    constructor(private postBusiness: PostBusiness) { }

    public getPosts = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined

            const output = await this.postBusiness.getPosts(q)

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
            const input = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

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
  
        if(error instanceof ZodError ){
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

      const input = {
        idToDelete: req.params.id
      }

      const output = await this.postBusiness.deletePost(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

}
