import { PostBusiness } from "../business/PostBusiness";
import { ZodError } from "zod";
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { GetPostInputDTO } from "../dtos/posts/GetPostDTO";
import { CreatePostSchema } from "../dtos/posts/CreatPostDTO";
import { EditPostInputSchema } from "../dtos/posts/EditPostDTO";
import { DeletePostInputSchema } from "../dtos/posts/DeletePostDTO";
import { LikePostInputSchema } from "../dtos/posts/LikePostDTO";

export class PostController {
  constructor(private postBusiness: PostBusiness) {}

  public getPosts = async (req: Request, res: Response) => {
    try {
      const tokenInput = req.headers.authorization as string;

      const token: GetPostInputDTO = {
        token: tokenInput,
      };

      const output = await this.postBusiness.getPosts(token);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization,
      });

      await this.postBusiness.createPost(input);

      res.status(200).send({ content: input.content });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public editPost = async (req: Request, res: Response) => {
    try {
      const input = EditPostInputSchema.parse({
        id: req.params.id,
        token: req.headers.authorization,
        content: req.body.content,
      });

      await this.postBusiness.editPost(input);

      res.status(200).send({ content: input.content });
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

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostInputSchema.parse({
        id: req.params.id,
        token: req.headers.authorization,
      });

      await this.postBusiness.deletePost(input);

      res.status(200).send();
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

  public likePost = async (req: Request, res: Response) => {
    try {
      const input = LikePostInputSchema.parse({
        id: req.params.id,
        token: req.headers.authorization,
        like: req.body.like,
      });

      await this.postBusiness.likePost(input);

      res.status(200).send();
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
