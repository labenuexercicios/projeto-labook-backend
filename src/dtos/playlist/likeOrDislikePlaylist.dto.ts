import z from 'zod'

export interface LikeOrDislikePlaylistInputDTO {
  playlistId: string,
  token: string,
  like: boolean
}

export type LikeOrDislikePlaylistOutputDTO = undefined

export const LikeOrDislikePlaylistSchema = z.object({
  playlistId: z.string().min(1),
  token: z.string().min(1),
  like: z.boolean()
}).transform(data => data as LikeOrDislikePlaylistInputDTO)
