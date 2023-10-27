import { Request, Response } from "express"
import { ZodError } from "zod"
import { PostBusiness } from "../business/PostBusiness"
import { CreatePostSchema } from "../dtos/post/createPost.dto"
import { BaseError } from "../errors/BaseError"
import { GetPostsSchema } from "../dtos/post/getPosts.dtos"
import { EditPostSchema } from "../dtos/post/editPost.dto"
import { DeletePostSchema } from "../dtos/post/deletePost.dto"
import { likeDislikeSchema } from "../dtos/post/likeDislikePost.dto"

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }
    public createPost = async (req: Request, res: Response) => {
        try {
            const input = CreatePostSchema.parse({
                token: req.headers.authorization,
                content: req.body.content
            })
            const output = await this.postBusiness.createPost(input)
            res.status(201).send(output)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("ERRO INESPERADO, tente novamente!")
            }
        }
    }
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
                res.status(500).send("ERRO INESPERADO !")
            }

        }
    }
    public editPost =async(req:Request,res:Response)=>{
        try {
            const input = EditPostSchema.parse({
                token:req.headers.authorization,
                content:req.body.content,
                postId:req.params.id
            })
            const output  = await this.postBusiness.editPost(input)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if(error instanceof ZodError){
                res.status(400).send(error.issues)

            }else if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("Erro inesperado!!")
            }
        }
    }

    public deletePost =async(req:Request,res:Response)=>{
        try {
            const input = DeletePostSchema.parse({
                token:req.headers.authorization,
                postId:req.params.id
            })
            const output  = await this.postBusiness.deletePost(input)
            
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if(error instanceof ZodError){
                res.status(400).send(error.issues)

            }else if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("Erro inesperado!!")
            }
        }
    }
    public likeDislike =async(req:Request,res:Response)=>{
        try {
            const input = likeDislikeSchema.parse({
                token:req.headers.authorization,
                postId:req.params.id,
                like:req.body.like
            })
            const output  = await this.postBusiness.likeDislike(input)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if(error instanceof ZodError){
                res.status(400).send(error.issues)

            }else if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("Erro inesperado!!")
            }
        }
    }
}