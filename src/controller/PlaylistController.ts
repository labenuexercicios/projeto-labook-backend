import { Request, Response } from "express";
import { PlaylistBusiness } from "../business/PlaylistBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { CreatePlaylistSchema } from "../dtos/playlist/createPlaylist.dto";
import { GetPlaylistsSchema } from "../dtos/playlist/getPlaylists.dto";
import { EditPlaylistSchema } from "../dtos/playlist/editPlaylist.dto";
import { DeletePlaylistSchema } from "../dtos/playlist/deletePlaylist.dto";
import { LikeOrDislikePlaylistSchema } from "../dtos/playlist/likeOrDislikePlaylist.dto";

export class PlaylistController {
  constructor(
    private playlistBusiness: PlaylistBusiness
  ) {}

  public createPlaylist = async (req: Request, res: Response) => {
    try {
      const input = CreatePlaylistSchema.parse({
        name: req.body.name,
        token: req.headers.authorization
      })

      const output = await this.playlistBusiness.createPlaylist(input)

      res.status(201).send(output)
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public getPlaylists = async (req: Request, res: Response) => {
    try {
      const input = GetPlaylistsSchema.parse({
        token: req.headers.authorization
      })

      const output = await this.playlistBusiness.getPlaylists(input)

      res.status(200).send(output)
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public editPlaylist = async (req: Request, res: Response) => {
    try {
      const input = EditPlaylistSchema.parse({
        token: req.headers.authorization,
        name: req.body.name,
        idToEdit: req.params.id
      })

      const output = await this.playlistBusiness.editPlaylist(input)

      res.status(200).send(output)
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public deletePlaylist = async (req: Request, res: Response) => {
    try {
      const input = DeletePlaylistSchema.parse({
        token: req.headers.authorization,
        idToDelete: req.params.id
      })

      const output = await this.playlistBusiness.deletePlaylist(input)

      res.status(200).send(output)
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public likeOrDislikePlaylist = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikePlaylistSchema.parse({
        token: req.headers.authorization,
        playlistId: req.params.id,
        like: req.body.like
      })

      const output = await this.playlistBusiness.likeOrDislikePlaylist(input)

      res.status(200).send(output)
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}