import { z } from "zod"
import { UserModel } from "../../models/User"

//- `GetUsersInputDTO`: Define os campos `query` e `token`. O campo `query` representa o critério de busca para filtrar os usuários, e o campo `token` representa o token de autenticação do usuário que está fazendo a requisição.
export interface GetUsersInputDTO {
    query: string,
    token: string,
}
//- `GetUsersOutputDTO`: É um tipo definido como um array de objetos do tipo `UserModel`. Essa interface representa os usuários retornados pela operação de obtenção de usuários.
export type GetUsersOutputDTO = UserModel[]
//O esquema de validação definido usando a biblioteca Zod é chamado `GetUsersSchema`. Ele valida os campos `query` e `token`. O campo `query` é opcional, mas caso seja fornecido, ele deve ser uma string com tamanho mínimo de 1 caractere. O campo `token` é validado como uma string com tamanho mínimo de 1 caractere. A transformação é aplicada para garantir que os dados de entrada sejam do tipo `GetUsersInputDTO`.
export const GetUsersSchema = z.object({
    query: z.string().min(1).optional(),
    token: z.string().min(1)
}).transform(data => data as GetUsersInputDTO)
