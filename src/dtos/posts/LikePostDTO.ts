import z from "zod";

export interface LikePostInputDTO {
  id: string;
  token: string;
  like: boolean;
}

export const LikePostInputSchema = z
  .object({
    id: z
      .string({
        required_error: "id do post é obrigatório para deletá-lo",
        invalid_type_error: "id do post precisa ser string",
      })
      .min(1),
    token: z.string({
      required_error: "token é obrigatório para deletar o post",
      invalid_type_error: "token precisa ser string",
    }),
    like: z.boolean({
      required_error: "'like' é obrigatório para deletar o post",
      invalid_type_error: "'like' precisa ser string",
    }),
  })
  .transform((data) => data as LikePostInputDTO);
