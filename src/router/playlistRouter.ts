import express from 'express'
import { PlaylistController } from '../controller/PlaylistController'
import { PlaylistBusiness } from '../business/PlaylistBusiness'
import { PlaylistDatabase } from '../database/PlaylistDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'

export const playlistRouter = express.Router()

const playlistController = new PlaylistController(
  new PlaylistBusiness(
    new PlaylistDatabase(),
    new IdGenerator(),
    new TokenManager()
  )
)

playlistRouter.post("/", playlistController.createPlaylist)
playlistRouter.get("/", playlistController.getPlaylists)
playlistRouter.put("/:id", playlistController.editPlaylist)
playlistRouter.delete("/:id", playlistController.deletePlaylist)

playlistRouter.put("/:id/like", playlistController.likeOrDislikePlaylist)