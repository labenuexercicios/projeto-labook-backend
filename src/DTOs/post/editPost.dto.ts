import z from 'zod'

export interface EditPostInputDTO{
    content: string,
    token: string,
    idToEdit: string,
}

export type EditPostOutputDTO = undefined

export const EditPostSchema = z.object({
    token: z.string().min(1),
    idToEdit: z.string().min(1),
    content: z.string().min(10,{
        message:"O Post deve possuir no mínimo 10 caracteres."
    })
}).transform(data => data as EditPostInputDTO )