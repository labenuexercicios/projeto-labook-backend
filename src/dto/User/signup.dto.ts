import { z } from "zod"
//- `SignupInputDTO`: Define os campos `name`, `email` e `password`. O campo `name` representa o nome do usuário a ser cadastrado, o campo `email` representa o e-mail do usuário e o campo `password` representa a senha escolhida pelo usuário.
export interface SignupInputDTO {
  name: string,
  email: string,
  password: string
}
//`SignupOutputDTO`: Define os campos `message` e `token`. O campo `message` é uma mensagem relacionada à operação de cadastro e o campo `token` representa o token de autenticação retornado após o cadastro bem-sucedido.

export interface SignupOutputDTO {
  message: string,
  token: string
}
//O esquema de validação definido usando a biblioteca Zod é chamado `SignupSchema`. Ele valida os campos `name`, `email` e `password`. O campo `name` deve ser uma string com no mínimo 2 caracteres, o campo `email` deve ser uma string válida de e-mail e o campo `password` deve atender a uma expressão regular que exige uma senha com entre 8 e 12 caracteres, contendo letras maiúsculas, letras minúsculas, pelo menos um número e pelo menos um caractere especial. A transformação é aplicada para garantir que os dados de entrada sejam do tipo `SignupInputDTO`.
export const SignupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g), 'A senha deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial.')
}).transform(data => data as SignupInputDTO)
