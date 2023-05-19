import { z } from "zod"
//A interface EditPostByIdInputDTO define os campos necessários para editar uma postagem, incluindo o ID da postagem a ser editada, o novo conteúdo da postagem e o token de autenticação.

export interface EditPostByIdInputDTO {
  idToEditPost: string,
  content: string,
  token: string
}
//A interface EditPostByIdOutputDTO define a estrutura da resposta após a edição da postagem, contendo uma mensagem.

export interface EditPostByIdOutputDTO {
  message: string
}
//O esquema de validação EditPostByIdSchema define as regras de validação para os campos idToEditPost, content e token utilizando a biblioteca zod. Essas regras garantem que os campos sejam strings não vazias.

export const EditPostByIdSchema = z.object({
    idToEditPost: z.string().min(1),
    content: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as EditPostByIdInputDTO)