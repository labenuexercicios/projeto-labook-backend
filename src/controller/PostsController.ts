import {Request, Response} from 'express'
import {PostsBusiness} from '../business/PostsBusiness'

export class PostsController {
    public fetchPosts = async (req: Request, res: Response) => {
        try {
            const input = {}
            const postsBusiness = new PostsBusiness()
            const output = await postsBusiness.fetchPosts(input)
            

        res.status(200).send(output)
        } catch (error) {
            console.log(error)
        }
    }
    public createNewPost = async (req:Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                creatorId: req.body.creatorId,
                content: req.body.content
            }
            const postsBusiness = new PostsBusiness()
            const output = await postsBusiness.createNewPost(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)
        }
    }
    public editPost = async (req:Request, res: Response) => {
        try {
            const input = {
                id: req.params.id,
                content: req.body.content
            }
            const postsBusiness = new PostsBusiness()
            const output = await postsBusiness.editPost(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)
        }
    }
    public deletePost = async (req:Request, res: Response) => {
        try {
            const input = {
                id: req.params.id
            }
            const postsBusiness = new PostsBusiness()
            const output = postsBusiness.deletePost(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)
        }
    }
}