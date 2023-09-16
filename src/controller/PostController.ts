import { PostBusiness } from "../business/PostBusiness";
import { CreatePostSchema } from "../dtos/post/createPostDTO";
import { Request, Response } from "express"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError";
import { EditPostSchema } from "../dtos/post/editPostDTO";
import { DeletePostSchema } from "../dtos/post/deletePostDTO";
import { LikeDislikeInputDTO, LikeDislikeSchema } from "../dtos/post/likeDislikeDTO";
import { GetPostInputDTO, GetPostSchema } from "../dtos/post/getPostDTO";

export class PostController {
    constructor (
        private postBusiness: PostBusiness
    ){}

    public createPost = async (req:Request, res: Response) => {
        try {
            const input = CreatePostSchema.parse({
                
                content: req.body.content,
                
                token: req.headers.authorization
            })
            const output = await this.postBusiness.createPost(input)
            res.status(201).send(output)
        } catch (error) {
            console.log(error)
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

    public getPosts = async (req: Request, res: Response) => {
        try {
            const input = GetPostSchema.parse({
                token: req.headers.authorization
            })
            const output = await this.postBusiness.getPosts(input)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            const input = EditPostSchema.parse({
                idToEdit: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            })
            const output = await this.postBusiness.editPosts(input)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input = DeletePostSchema.parse({
                idToDelete: req.params.id,
                token: req.headers.authorization
            })
            const output = await this.postBusiness.deletePosts(input)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (error instanceof ZodError){
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public likeDislikePost = async (req: Request, res: Response) => {
        try {

            const input = LikeDislikeSchema.parse({
                idToLikeDislike: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            })

            await this.postBusiness.likeDislikePost(input)

            res.status(200).end()

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