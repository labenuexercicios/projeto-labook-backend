import { PostDatabase } from "../database/PostDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { PostDB } from "../types";
import { Post } from "../models/Post";

export class PostBusiness {
  public getPosts = async () => {
    const postDatabase = new PostDatabase();
    const postsDB: PostDB[] = await postDatabase.findePosts();

    const posts = postsDB.map(
      (postDB) =>
        new Post(
          postDB.id,
          postDB.content,
          postDB.likes,
          postDB.deslikes,
          postDB.created_at,
          postDB.updated_at,
          postDB.creator_id
        )
    );
    return posts;
  };
}
