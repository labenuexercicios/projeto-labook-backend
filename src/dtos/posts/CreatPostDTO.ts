import z from "zod";

export interface CreatePostInputDTO {
  content: string;
  token: string;
}

export interface CreatePostOutputDTO {
  content: string;
}

export const CreatePostSchema = z
  .object({
    content: z
      .string({
        required_error: "'content' é obrigatório",
        invalid_type_error: "'content' precisa ser uma string",
      })
      .min(1, "'content' deve ter pelo menos 1 caractere"),
    token: z
      .string({
        required_error:
          "É necessário um token para acessar a requisição createPost",
      })
      .min(1),
  })
  .transform((data) => data as CreatePostInputDTO);
