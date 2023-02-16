import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostDataBase } from "../database/PostDataBase";
import { BaseError } from "../errors/BaseErrors";
import { Post } from "../models/Post";
import { TPosts, TPostsLike } from "../models/types";

export class PostController {
    public createPost =  async (req: Request, res: Response) => {
        try {
            
            const input =  {
                id: req.body.id,
                creator_id: req.body.creator_id,
                content: req.body.content,
                likes: req.body.likes,
                dislikes: req.body.dislikes
            }

            const userBusiness = new PostBusiness()
            const output = await userBusiness.createPost(input)

            console.log(output);
            
          
            res.status(201).send(output)
    
        } catch (error: any) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }

    public getPost = async (req: Request, res: Response) => {
        try {
    
            const postBusiness = new PostBusiness()
            const output = await postBusiness.getPost()
    
            res.status(200).send(output)
        }
        catch (error: any) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }

    public updatePost = async (req: Request, res: Response) => {
        try {
            const idParams = req.params.id 
            
            
            const input =  {
                id: req.body.id,
                creator_id: req.body.creator_id,
                content: req.body.content,
                likes: req.body.likes,
                dislikes: req.body.dislikes
            }

            const postBusiness = new PostBusiness()
            const output = await postBusiness.updatePost(input, idParams)
          

            res.status(200).send(output)
            } 
            catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            const postBusiness = new PostBusiness()
            const output = await postBusiness.deletePost(id)
           
            res.status(200).send(output)
    
        } catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }

    public updatePostId = async (req: Request, res: Response) => {
        try {
            const idParams = req.params.id 

            const input = {
                id: req.body.id,
                creator_id: req.body.creator_id,
                content: req.body.content,
                likes: req.body.likes,
                dislikes: req.body.dislikes
            }

            const postBusiness = new PostBusiness()
            const output = await postBusiness.updatePostId(input)
    
          
            res.status(200).send("Post atualizado com sucesso")
            }catch (error) {
            console.log(error)
    
            if (error instanceof BaseError) {
                res.status(error.statusCode)
                .send(error.message)
            }else{
                res.send("Erro inesperado")
            }
        }
    }
}