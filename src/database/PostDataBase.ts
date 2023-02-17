import { PostWithCreatorsDB, UserDB } from "../interfaces/types";
import { BaseDataBase } from "./BaseDataBase";

export class PostDataBase extends BaseDataBase {
  public static TABLE_POSTS = "posts";

  public getPostsWithCreators = async () => {
    const result: PostWithCreatorsDB[] = await BaseDataBase.connection(
      PostDataBase.TABLE_POSTS
    )
      .select(
        "posts.id",
        "posts.creator_id",
        "posts.content",
        "posts.likes",
        "posts.dislikes",
        "posts.created_at",
        "posts.updated_at",
        "users.name AS creator_name"
      )
      .join("users","posts.creator_id", "=", "users.id");
    return result;
  };
}
