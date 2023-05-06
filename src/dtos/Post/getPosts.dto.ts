import z from "zod";

import { PostModel } from "../../types";

export interface GetPostInputDTO {
  q: string;
  token: string;
}

export type GetPostOutputDTO = PostModel[];

export const GetProductsSchema = z
  .object({
    q: z.string().min(1).optional(),
    token: z.string().min(1),
  })
  .transform((data) => data as GetPostInputDTO);
