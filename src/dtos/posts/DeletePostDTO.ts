import z from "zod";

export interface DeletePostInputDTO {
  id: string;
  token: string;
}

export const DeletePostInputSchema = z
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
  })
  .transform((data) => data as DeletePostInputDTO);
