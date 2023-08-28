import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { BaseError } from "../errors/BaseError"
import { ZodError } from "zod"
import { EditPostSchema } from "../dtos/Posts/editPost.dto"
import { GetPostsSchema, GetPostsByContentSchema, GetPostByIdSchema, GetUserPostsSchema } from "../dtos/Posts/getPosts.dto"
import { CreatePostSchema } from "../dtos/Posts/createPost.dto"
import { DeletePostSchema } from "../dtos/Posts/deletePost.dto"
import { LikeOrDislikePostSchema } from "../dtos/Posts/likeOrDislike.dto"

export class PostController {

  constructor(private postBusiness: PostBusiness) { }

  
  public getPosts = async (req: Request, res: Response) => {

    try {
          const input = GetPostsSchema.parse({
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


  public getPostsByContent = async (req: Request, res: Response) => {

    try {
          const input = GetPostsByContentSchema.parse({
            content: req.body.content,
            token: req.headers.authorization
        })

      const output = await this.postBusiness.getPostsByContent(input)

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

  public getPostById = async (req: Request, res: Response) => {

    try {
          const input = GetPostByIdSchema.parse({
            id: req.params.id,
            token: req.headers.authorization
        })

      const output = await this.postBusiness.getPostById(input)

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

  public getUserPosts = async (req: Request, res: Response) => {

    try {
          const input = GetUserPostsSchema.parse({
            creatorId: req.params.id,
            token: req.headers.authorization
        })

      const output = await this.postBusiness.getUserPosts(input)

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
        idToEdit: req.params.id,
        content: req.body.content,
        token: req.headers.authorization
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
        idToDelete: req.params.id,
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

  
  public likeOrDislikePost = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikePostSchema.parse({
        postId: req.params.id,
        like: req.body.like,
        token: req.headers.authorization
      })

      const output = await this.postBusiness.likeOrDislikePost(input)

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
