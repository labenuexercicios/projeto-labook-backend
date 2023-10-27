import z from "zod"

export interface DeletePostInputDTO{
    token:string,
    content:string,
    postId:string
}

export type DeletePostOutputDTO  = undefined

export const DeletePostSchema = z.object({
    token:z.string().min(2), 
    postId:z.string().min(2)
}).transform(data => data as DeletePostInputDTO)