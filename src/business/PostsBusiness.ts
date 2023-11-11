import { PostDatabase } from "../database/PostDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Post } from "../models/Post";
import { PostDB } from "../types";

export class PostsBusiness {
  public async fetchPosts(input: any) {
    const postDatabase = new PostDatabase();
    const postDB = await postDatabase.getPosts();
    const posts: Array<Post> = postDB.map(
      (post) =>
        new Post(
          post.id,
          post.creator_id,
          post.content,
          post.likes,
          post.dislikes,
          post.created_at,
          post.updated_at
        )
    );
    return posts;
  }
  public async createNewPost(input: any) {
    const { id, creatorId, content } = input;
    if (typeof creatorId !== "string") {
      throw new BadRequestError("type errado");
    }
    if (typeof content !== "string") {
      throw new BadRequestError("type errado");
    }
    const postDatabase = new PostDatabase();
    const idToBeCreated = await postDatabase.getPostById(id);
    if (idToBeCreated) {
      throw new BadRequestError("esse id ja esta cadastrado");
    }
    const newPost = new Post(
      id,
      creatorId,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    );
    const newPostDB: PostDB = {
      id: newPost.getId(),
      creator_id: newPost.getCreatorId(),
      content: newPost.getContent(),
      likes: newPost.getLikes(),
      dislikes: newPost.getDislikes(),
      created_at: newPost.getCreatedAt(),
      updated_at: newPost.getUpdatedAt(),
    };

    await postDatabase.insertPost(newPostDB);
    return newPost;
  }
  public async editPost(input: any) {
    const { id, content } = input;

    const postDatabase = new PostDatabase();
    const postDB = await postDatabase.getPostById(id);
    if (!postDB) {
      throw new NotFoundError("'id' nao encontrado");
    }
    const post = new Post(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at
    );
    id && post.setId(id);
    content && post.setContent(content);

    const newPostDb: PostDB = {
      id: post.getId(),
      creator_id: post.getCreatorId(),
      content: post.getContent(),
      likes: post.getLikes(),
      dislikes: post.getDislikes(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt(),
    };
    await postDatabase.updatePost(newPostDb, id);
  }
  public async deletePost(input: any) {
    const { id } = input;
    const postDatabase = new PostDatabase();
    const postDB = await postDatabase.getPostById(id);
    if (!postDB) {
      throw new NotFoundError("id nao encontrado");
    }
    const post = new Post(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at
    );
    const deletedPost: PostDB = {
      id: post.getId(),
      creator_id: post.getCreatorId(),
      content: post.getContent(),
      likes: post.getLikes(),
      dislikes: post.getDislikes(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt(),
    };

    await postDatabase.deletePost(deletedPost, id);
    return post;
  }
}
