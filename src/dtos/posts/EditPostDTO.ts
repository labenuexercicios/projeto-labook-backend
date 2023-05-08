import z from "zod";

export interface EditPostInputDTO {
  id: string;
  token: string;
  content: string;
}

export interface EditPostOutputDTO {
  content: string;
}

export const EditPostInputSchema = z
  .object({
    id: z
      .string({
        required_error: "id do post é obrigatório para editá-lo",
        invalid_type_error: "id do post precisa ser string",
      })
      .min(1),
    token: z.string({
      required_error: "token é obrigatório para editar o post",
      invalid_type_error: "token precisa ser string",
    }),
    content: z
      .string({
        required_error: "content é obrigatório para editar o post",
        invalid_type_error: "content precisa ser string",
      })
      .min(5, "content precisa de no mínimo 5 carcateres"),
  })
  .transform((data) => data as EditPostInputDTO);
