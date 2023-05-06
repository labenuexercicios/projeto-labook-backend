import z from "zod";

import { PostModel } from "../../types";

export interface CreatePostInputDTO {
  name: string;
  content: string;
  like: number;
  deslike: number;
}

export interface CreatePostOutputDTO {
  message: string;
  content: PostModel;
}

export const CreateProductSchema = z
  .object({
    // id: z.string().min(1),
    name: z.string().min(2),
    price: z.number().gt(0),
    token: z.string().min(1),
  })
  .transform((data) => data as CreatePostInputDTO);
