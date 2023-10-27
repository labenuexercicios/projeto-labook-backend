import z from "zod"

export interface EditPostInputDTO{
    token:string,
    content:string,
    postId:string
}
export type EditPostOutputDTO = undefined

export const  EditPostSchema = z.object({
    token:z.string().min(2),
    content:z.string().min(2),
    postId:z.string().min(2)
}).transform(data => data as EditPostInputDTO)