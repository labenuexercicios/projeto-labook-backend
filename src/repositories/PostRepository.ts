import sqlite from 'sqlite3';
import { Post } from '../models';

class PostRepository {
  private db: sqlite.Database;

  constructor() {
    this.db = new sqlite.Database('path/to/your/database.db');
  }

  findById(id: string): Promise<Post | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM posts WHERE id = ?', id, (error, row) => {
        if (error) {
          reject(error);
        } else if (!row) {
          resolve(null);
        } else {
          const post = new Post(row.content, row.creatorId);
          post.id = row.id;
          post.likes = row.likes;
          post.dislikes = row.dislikes;
          post.createdAt = new Date(row.createdAt);
          post.updatedAt = new Date(row.updatedAt);
          resolve(post);
        }
      });
    });
  }

  create(post: Post): Promise<Post> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO posts (id, content, likes, dislikes, createdAt, updatedAt, creatorId) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [post.id, post.content, post.likes, post.dislikes, post.createdAt.toISOString(), post.updatedAt.toISOString(), post.creatorId],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(post);
          }
        }
      );
    });
  }
  
  // Outras operações como update e delete
}

export default PostRepository;
