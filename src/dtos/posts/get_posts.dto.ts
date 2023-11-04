import z from "zod"

import { GetPostsModel} from "../../models/post"


export interface GetPostsInputDTO {
  token:string
}

export type GetPostsOutputDTO = GetPostsModel[];

export const GetPostsSchema = z.object({
  token: z.string().min(2)
}).transform(data => data as GetPostsInputDTO)