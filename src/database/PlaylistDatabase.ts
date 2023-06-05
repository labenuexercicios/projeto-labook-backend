import { LikeDislikeDB, PLAYLIST_LIKE, PlaylistDB, PlaylistDBWithCreatorName } from "../models/Playlist";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PlaylistDatabase extends BaseDatabase {
  public static TABLE_PLAYLISTS = "playlists"
  public static TABLE_LIKES_DISLIKES = "likes_dislikes"

  public insertPlaylist = async (
    playlistDB: PlaylistDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(PlaylistDatabase.TABLE_PLAYLISTS)
      .insert(playlistDB)
  }

  public getPlaylistsWithCreatorName =
    async (): Promise<PlaylistDBWithCreatorName[]> => {

    const result = await BaseDatabase
      .connection(PlaylistDatabase.TABLE_PLAYLISTS)
      .select(
        `${PlaylistDatabase.TABLE_PLAYLISTS}.id`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.creator_id`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.name`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.likes`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.dislikes`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.created_at`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.creator_id`, 
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
    
    return result as PlaylistDBWithCreatorName[]
  }

  public findPlaylistById = async (
    id: string
  ): Promise<PlaylistDB | undefined> => {
    const [result] = await BaseDatabase
      .connection(PlaylistDatabase.TABLE_PLAYLISTS)
      .select()
      .where({ id })

    return result as PlaylistDB | undefined
  }

  public updatePlaylist = async (
    playlistDB: PlaylistDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(PlaylistDatabase.TABLE_PLAYLISTS)
      .update(playlistDB)
      .where({ id: playlistDB.id })
  }

  public deletePlaylistById = async (
    id: string
  ): Promise<void> => {
    await BaseDatabase
      .connection(PlaylistDatabase.TABLE_PLAYLISTS)
      .delete()
      .where({ id })
  }

  public findPlaylistWithCreatorNameById =
    async (id: string): Promise<PlaylistDBWithCreatorName | undefined> => {

    const [result] = await BaseDatabase
      .connection(PlaylistDatabase.TABLE_PLAYLISTS)
      .select(
        `${PlaylistDatabase.TABLE_PLAYLISTS}.id`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.creator_id`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.name`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.likes`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.dislikes`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.created_at`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PlaylistDatabase.TABLE_PLAYLISTS}.creator_id`, 
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
      .where({ [`${PlaylistDatabase.TABLE_PLAYLISTS}.id`]: id })
    
    return result as PlaylistDBWithCreatorName | undefined
  }

  public findLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<PLAYLIST_LIKE | undefined> => {

    const [result]: Array<LikeDislikeDB | undefined> = await BaseDatabase
      .connection(PlaylistDatabase.TABLE_LIKES_DISLIKES)
      .select()
      .where({
        user_id: likeDislikeDB.user_id,
        playlist_id: likeDislikeDB.playlist_id
      })

    if (result === undefined) {
      return undefined

    } else if (result.like === 1) {
      return PLAYLIST_LIKE.ALREADY_LIKED
      
    } else {
      return PLAYLIST_LIKE.ALREADY_DISLIKED
    }
  }

  public removeLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(PlaylistDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        playlist_id: likeDislikeDB.playlist_id
      })
  }

  public updateLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(PlaylistDatabase.TABLE_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        playlist_id: likeDislikeDB.playlist_id
      })
  }

  public insertLikeDislike = async (
    likeDislikeDB: LikeDislikeDB
  ): Promise<void> => {
    await BaseDatabase
      .connection(PlaylistDatabase.TABLE_LIKES_DISLIKES)
      .insert(likeDislikeDB)
  }
}
