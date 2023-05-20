import { z } from "zod"
//- `LoginInputDTO`: Define os campos `email` e `password`. O campo `email` representa o e-mail do usuário para efetuar o login, e o campo `password` representa a senha fornecida pelo usuário.
export interface LoginInputDTO {
  email: string,
  password: string
}
//- `LoginOutputDTO`: Define os campos `message` e `token`. O campo `message` é uma mensagem relacionada à operação de login, e o campo `token` representa o token de autenticação retornado após o login bem-sucedido.
export interface LoginOutputDTO {
  message: string,
  token: string
}
//O esquema de validação definido usando a biblioteca Zod é chamado `LoginSchema`. Ele valida os campos `email` e `password`. O campo `email` deve ser uma string válida de e-mail, enquanto o campo `password` deve ter um tamanho mínimo de 8 caracteres. A transformação é aplicada para garantir que os dados de entrada sejam do tipo `LoginInputDTO`.
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
}).transform(data => data as LoginInputDTO)
