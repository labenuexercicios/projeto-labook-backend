import { z } from "zod"
//DeleteUserByIdInputDTO: Define os campos idToDelete e token, que representam o ID do usuário a ser excluído e o token de autenticação do usuário que está fazendo a requisição, respectivamente.
export interface DeleteUserByIdInputDTO {
  idToDelete: string,
  token: string
}
//DeleteUserByIdOutputDTO: Define o campo message, que representa a mensagem de retorno após a exclusão do usuário.
export interface DeleteUserByIdOutputDTO {
  message: string
}
//Ele valida os campos idToDelete e token, garantindo que ambos sejam strings com tamanho mínimo de 1 caractere. A transformação é aplicada para garantir que os dados de entrada sejam do tipo DeleteUserByIdInputDTO.
export const DeleteUserByIdSchema = z.object({
    idToDelete: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as DeleteUserByIdInputDTO)