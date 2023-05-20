import { z } from "zod"
//EditUserByIdInputDTO: Define os campos idToEditUser, name, email, password e token. O campo idToEditUser representa o ID do usuário a ser editado, enquanto os campos name, email e password representam as informações do usuário a serem atualizadas. O campo token representa o token de autenticação do usuário que está fazendo a requisição.
export interface EditUserByIdInputDTO {
  idToEditUser: string,
  name?: string,
  email?: string,
  password?: string,
  token: string
}
//EditUserByIdOutputDTO: Define o campo message, que representa a mensagem de retorno após a edição do usuário.
export interface EditUserByIdOutputDTO {
  message: string
}
//Ele valida os campos idToEditUser, name, email, password e token. O campo idToEditUser é validado como uma string com tamanho mínimo de 1 caractere. Os campos name e email são opcionais, mas caso sejam fornecidos, eles devem ser strings com tamanho mínimo de 2 caracteres e uma representação de email válido, respectivamente. O campo password também é opcional, mas se fornecido, ele deve atender a um padrão específico definido pela expressão regular fornecida. O campo token é validado como uma string com tamanho mínimo de 1 caractere. A transformação é aplicada para garantir que os dados de entrada sejam do tipo EditUserByIdInputDTO.
export const EditUserByIdSchema = z.object({
    idToEditUser: z.string().min(1),
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g), 'A senha deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial.').optional(),
    token: z.string().min(1)
}).transform(data => data as EditUserByIdInputDTO)