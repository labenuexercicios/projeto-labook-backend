import z from "zod";

export interface GetPostInputDTO {
  token: string;
}

export interface GetPostOutputDTO {
  content: string;
}

export interface GetPostOutputDTO {
  id: string;
  // creatorId: string,
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
}

export const GetPostSchema = z
  .object({
    token: z.string().min(1),
  })
  .transform((data) => data as GetPostInputDTO);
