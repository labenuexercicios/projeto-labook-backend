import { z } from 'zod'
//A interface LikeOrDislikePostInputDTO define os campos necessários para curtir ou descurtir uma postagem, incluindo o ID da postagem, o token de autenticação e um campo booleano like que indica se o usuário está curtindo ou descurtindo a postagem.
export interface LikeOrDislikePostInputDTO {
    postId: string,
    token: string,
    like: boolean
}
//A interface LikeOrDislikePostOutputDTO define o tipo de retorno dessa operação, que é undefined.
export type LikeOrDislikePostOutputDTO = undefined
//O esquema de validação LikeOrDislikePostSchema define as regras de validação para os campos postId, token e like usando a biblioteca zod. O postId e o token devem ser strings não vazias, enquanto o campo like deve ser um booleano.
export const LikeOrDislikePostSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1),
    like: z.boolean()
}).transform(data => data as LikeOrDislikePostInputDTO)