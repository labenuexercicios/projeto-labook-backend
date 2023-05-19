import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import {
  GetPostsInputDTO,
  GetPostsOutputDTO,
  GetPostsSchema,
} from "../dto/Post/getPosts.dto";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
  CreatePostSchema,
} from "../dto/Post/createPost.dto";
import {
  EditPostByIdInputDTO,
  EditPostByIdOutputDTO,
  EditPostByIdSchema,
} from "../dto/Post/editPostById.dto";
import {
  DeletePostByIdInputDTO,
  DeletePostByIdOutputDTO,
  DeletePostByIdSchema,
} from "../dto/Post/deletePostById.dto";
import {
  LikeOrDislikePostInputDTO,
  LikeOrDislikePostOutputDTO,
  LikeOrDislikePostSchema,
} from "../dto/Post/likeOrDislikePost.dto";

export class PostController {
  constructor(private postBusiness: PostBusiness) {}

  /**
   * Cria um novo post.
   *
   * @param req - Objeto de requisição do Express.
   * @param res - Objeto de resposta do Express.
   */
  public createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: CreatePostInputDTO = CreatePostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization,
      });

      const output: CreatePostOutputDTO = await this.postBusiness.createPost(
        input
      );
      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado.");
      }
    }
  };

  /**
   * Obtém os posts de acordo com os critérios informados.
   *
   * @param req - Objeto de requisição do Express.
   * @param res - Objeto de resposta do Express.
   */
  public getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: GetPostsInputDTO = GetPostsSchema.parse({
        query: req.query.q,
        token: req.headers.authorization,
      });

      const output: GetPostsOutputDTO = await this.postBusiness.getPosts(input);
      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado.");
      }
    }
  };

  /**
   * Edita um post existente com o ID informado.
   *
   * @param req - Objeto de requisição do Express.
   * @param res - Objeto de resposta do Express.
   */
  public editPostById = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: EditPostByIdInputDTO = EditPostByIdSchema.parse({
        idToEditPost: req.params.id,
        content: req.body.content,
        token: req.headers.authorization,
      });

      const output: EditPostByIdOutputDTO =
        await this.postBusiness.editPostById(input);
      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado.");
      }
    }
  };

  /**
   * Deleta um post existente com o ID informado.
   *
   * @param req - Objeto de requisição do Express.
   * @param res - Objeto de resposta do Express.
   */
  public deletePostById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const input: DeletePostByIdInputDTO = DeletePostByIdSchema.parse({
        idToDelete: req.params.id,
        token: req.headers.authorization,
      });

      const output: DeletePostByIdOutputDTO =
        await this.postBusiness.deletePostById(input);
      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado.");
      }
    }
  };

  /**
   * Realiza a ação de curtir ou descurtir um post com o ID informado.
   *
   * @param req - Objeto de requisição do Express.
   * @param res - Objeto de resposta do Express.
   */
  public likeOrDislikePost = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikePostSchema.parse({
        postId: req.params.id,
        token: req.headers.authorization,
        like: req.body.like,
      });

      const output = await this.postBusiness.likeOrDislikePost(input);

      res.status(200).send(output);
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
