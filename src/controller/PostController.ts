import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostsInputDTO } from "../dtos/userDTO";
import { BaseError } from "../errors/BaseError";

export class PostController {
  constructor(private postBusiness: PostBusiness) {}
  public getAllPosts = async (req: Request, res: Response) => {
    try {
      const input: GetPostsInputDTO = {
        token: req.headers.authorization
      };

      const output = await this.postBusiness.getAllPosts(input);
      
      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public createPost = async (req: Request, res: Response) => {
    try {
      const input: CreatePostInputDTO = {
        token: req.headers.authorization,
        content: req.body.content
      }

      const output = await this.postBusiness.createPost(input)
      res.status(201).end()
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public editPost = async (req: Request, res: Response) => {
    try {
      const input: EditPostInputDTO = {
        idToEdit: req.params.id,
        content: req.body.content,
        token: req.headers.authorization
      }

      await this.postBusiness.editPost(input)
      res.status(200).end()
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public deletePost = async (req: Request, res: Response) => {
    try {
      const input: DeletePostInputDTO = {
        idToDelete: req.params.id,
        token: req.headers.authorization
      }

      await this.postBusiness.deletePost(input)
      res.status(200).end()
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
