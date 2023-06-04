import { Request, Response } from "express";
import { PostBusiness } from "../business/postBusiness";
import { DeletePostInputDTO, PostDTO } from "../dtos/postsDTO";
import { BaseError } from "../errors/BaseError";

export class PostController {
    constructor(
        private postBusiness: PostBusiness,
        private postDTO: PostDTO
    ) { }

    public getPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization;

            const input = this.postDTO.getPostInput(token);
            const output = await this.postBusiness.getPosts(input);

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

    public createPost = async (req: Request, res: Response): Promise<void> => {
        try {
            const { content } = req.body;
            const token = req.headers.authorization;

            const input = this.postDTO.createPost(content, token);
            await this.postBusiness.createPost(input);

            res.status(201).send("Post Criado com Sucesso!");
        } catch (error) {
            console.log(error);

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).send("Erro inesperado");
            }
        }
    };

    public editPost = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const token = req.headers.authorization;

            const input = this.postDTO.editPost(id, content, token);
            await this.postBusiness.editPost(input);

            res.status(200).send("Conteúdo editado com sucesso");
        } catch (error) {
            console.log(error);

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message);
            } else {
                res.status(500).send("Erro inesperado");
            }
        }
    };

    public deletePost = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: DeletePostInputDTO = {
                id: req.params.id,
                token: req.headers.authorization,
            };

            await this.postBusiness.deletePost(input);

            res.status(200).end("Post Deletado com sucesso.");
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