import { Request, Response } from "express-serve-static-core";
import { PostsBusiness } from "../business/post_business";
import { GetPostsSchema } from "../dtos/posts/get_posts.dto";
import { EditPostSchema } from "../dtos/posts/edit_posts.dto";
import { ZodError } from "zod";
import { BaseError } from "../error/base_error";
import { createPostSchema } from "../dtos/posts/create_posts.dto";
import { deletePostSchema } from "../dtos/posts/delete_posts.dto";
import { LikeDislikeSchema } from "../dtos/posts/like_dislike.dto";

export class PostsController {
  constructor(private postsBusiness: PostsBusiness) {}
  public createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = createPostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization
      });

      const result = await this.postsBusiness.createPost(input);
      res.status(200).send(result);
    } catch (error) {

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected error");
      }
    }
  };
  public getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const input = GetPostsSchema.parse({
            token: req.headers.authorization
        })
      const output = await this.postsBusiness.getPost(input);
      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected error");
      }
    }
  };
  public editPosts = async (req: Request, res: Response) => {
    try {

      const input = EditPostSchema.parse({
        idToEdit: req.params.id,
        content: req.body.content,
        token: req.headers.authorization
      })

      
      const output = await this.postsBusiness.editPosts(input)

      res.status(200).send(output)
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected error");
      }
    }
  }

  public deletePost = async (req: Request, res: Response) => {
    try {

      const input = deletePostSchema.parse({
        idToDelete: req.params.id,
        token: req.headers.authorization
      })

     
      const output = await this.postsBusiness.deletePost(input)

      res.status(200).send(output)
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected error");
      }
    }
  }  

  public likeDislike = async (req: Request, res: Response) => {
    try {
      const input =  LikeDislikeSchema.parse({
        idPost: req.params.id,
        token: req.headers.authorization,
        like: req.body.like
      })
      const output = this.postsBusiness.likeDislikePost(input)
      res.status(201).send(output)
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected error");
      }
    }
  }
}