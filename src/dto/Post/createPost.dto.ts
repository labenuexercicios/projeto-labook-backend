import { z } from "zod"
//A interface CreatePostInputDTO define os campos necessários para criar uma postagem, ou seja, o conteúdo da postagem e o token de autenticação.
export interface CreatePostInputDTO {
  content: string,
  token: string
}
//A interface CreatePostOutputDTO define a estrutura da resposta após a criação da postagem, contendo uma mensagem.
export interface CreatePostOutputDTO {
  message: string
}
//O esquema de validação CreatePostSchema define as regras de validação para os campos content e token utilizando a biblioteca zod. Essas regras garantem que os campos sejam strings não vazias.
export const CreatePostSchema = z.object({
    content: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as CreatePostInputDTO)