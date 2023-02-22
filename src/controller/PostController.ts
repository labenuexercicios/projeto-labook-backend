import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostInputDTO, GetPostInputDTO, PostDTO } from "../dtos/postDTO";


export class PostController{
    constructor(
        private postBusiness: PostBusiness,
        private postDTO : PostDTO
    ) {}

    public getPost = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization

            const input = this.postDTO.getPostInput(token);
            const output = await this.postBusiness.getPosts(input);

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            // if (error instanceof BaseError) {
            //     res.status(error.statusCode).send(error.message)
            // } else {
            //     res.status(500).send("Erro inesperado")
            // }
        }
    }

    public createPost = async (req: Request, res: Response)=> {

        try {
            const input: CreatePostInputDTO = {
              content: req.body.content,
              token: req.headers.authorization as string
            };
      
            const output = await this.postBusiness.createPost(input);
      
            res.status(201).send(output);
          } catch (error) {
            console.log(error);
      
            if (req.statusCode === 200) {
              res.status(500);
            }
      
            if (error instanceof Error) {
              res.send(error.message);
            } else {
              res.send("Erro inesperado");
            }
          }


    };
}