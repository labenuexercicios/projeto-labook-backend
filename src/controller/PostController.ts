
import { Response, Request } from "express";

import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { PostBusiness } from '../business/PostBusiness';
import { GetPostsOutputDTO, GetPostsSchema } from '../dtos/poust/getPost.dto';
import { CreatePostSchema } from '../dtos/poust/createPost.dto';
import { EditPostSchema } from '../dtos/poust/editPost.dto';
import { DeletePostSchema } from '../dtos/poust/deletePost.dto';
import { LikeDislikeSchema } from '../dtos/poust/likeDislike.dto';

export class PostController{
    constructor(
      private postBusiness: PostBusiness
    ){}

      public getAllPosts = async (req: Request, res: Response) => {
        try {
          const input = GetPostsSchema.parse({
            token: req.headers.authorization
          })

          const output: GetPostsOutputDTO = await this.postBusiness.getAllPosts(input)
          return res.status(200).send(output);
        } catch (error) {
          console.log(error)

          if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else if (error instanceof ZodError) {
            res.status(400).send(error.issues)
          } else {
            res.status(500).send("Unexpected error")
          }
        }
      };

      public createPost = async (req: Request, res: Response) => {
        try {
          const input = CreatePostSchema.parse({ 
            token: req.headers.authorization, 
            content: req.body.content 
          })
          console.log(input)

          const output = await this.postBusiness.createPost(input)
          return res.status(201).send(output);
        } catch (error) {
          console.log(error)

          if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else if (error instanceof ZodError) {
            res.status(400).send(error.issues)
          } else {
            res.status(500).send("Unexpected error")
          }
        }
      };

      public editPost = async (req: Request, res: Response) => {
        try {
          const input = EditPostSchema.parse({
            token: req.headers.authorization,
            idToEdit: req.params.id,
            content: req.body.content,
          })

          await this.postBusiness.editPost(input)
          return res.status(200).send('Post updated successfully');
        } catch (error) {
          console.log(error)
          if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else if (error instanceof ZodError) {
            res.status(400).send(error.issues)
          } else {
            res.status(500).send("Unexpected error")
          }
        }
      };

      public deletePost = async (req: Request, res: Response) => {
        try {
          const input = DeletePostSchema.parse({
            token: req.headers.authorization,
            id: req.params.id,
          })
          const output = await this.postBusiness.deletePost(input)
          return res.status(200).send(output);
        } catch (error) {
          console.log(error)
          if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else if (error instanceof ZodError) {
            res.status(400).send(error.issues)
          } else {
            res.status(500).send("Unexpected error")
          }
        }
      };

      public likeDislikePost = async (req: Request, res: Response) => {
        try {
          const input = LikeDislikeSchema.parse({
            token: req.headers.authorization,
            postId: req.params.id,
            like: req.body.like,
          })

          const output = await this.postBusiness.likeDislikePost(input);
          res.status(200).send(output)
        } catch (error) {
          console.log(error)

          if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else if (error instanceof ZodError) {
            res.status(400).send(error.issues)
          } else {
            res.status(500).send("Unexpected error")
          }
        }
      };
}