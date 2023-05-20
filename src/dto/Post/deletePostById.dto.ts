import { z } from "zod"
//A interface DeletePostByIdInputDTO define os campos necessários para excluir uma postagem, ou seja, o ID da postagem a ser excluída e o token de autenticação.

export interface DeletePostByIdInputDTO {
  idToDelete: string,
  token: string
}
//A interface DeletePostByIdOutputDTO define a estrutura da resposta após a exclusão da postagem, contendo uma mensagem.
export interface DeletePostByIdOutputDTO {
  message: string
}
//O esquema de validação DeletePostByIdSchema define as regras de validação para os campos idToDelete e token utilizando a biblioteca zod. Essas regras garantem que os campos sejam strings não vazias.
export const DeletePostByIdSchema = z.object({
    idToDelete: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as DeletePostByIdInputDTO)