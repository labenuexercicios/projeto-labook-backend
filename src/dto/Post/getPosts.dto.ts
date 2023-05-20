import { z } from "zod"
import { PostModel } from "../../models/Post"
//A interface GetPostsInputDTO define os campos necessários para obter postagens, incluindo uma query opcional para filtrar as postagens e o token de autenticação.
export interface GetPostsInputDTO {
    query: string,
    token: string
}
//A interface GetPostsOutputDTO define o tipo de retorno da obtenção de postagens, que é uma lista de objetos do tipo PostModel.
export type GetPostsOutputDTO = PostModel[]
//O esquema de validação GetPostsSchema define as regras de validação para os campos query e token utilizando a biblioteca zod. A query é opcional, mas caso seja fornecida, ela deve ser uma string não vazia. O token de autenticação também deve ser uma string não vazia.

export const GetPostsSchema = z.object({
    query: z.string().min(1).optional(),
    token: z.string().min(1)
}).transform(data => data as GetPostsInputDTO)