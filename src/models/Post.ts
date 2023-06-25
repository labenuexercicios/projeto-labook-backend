import sqlite from 'sqlite3';

interface PostData {
  id: string;
  title: string;
  content: string;
}

class Post {
  private db: sqlite.Database;

  constructor() {
    this.db = new sqlite.Database('path/to/your/database.db');
  }

  public getAll(): Promise<PostData[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM posts', (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public getById(id: string): Promise<PostData | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM posts WHERE id = ?', [id], (error, row) => {
        if (error) {
          reject(error);
        } else if (!row) {
          resolve(null);
        } else {
          resolve(row);
        }
      });
    });
  }

  public save(post: PostData): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO posts (id, title, content) VALUES (?, ?, ?)',
        [post.id, post.title, post.content],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }

  public deleteById(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM posts WHERE id = ?', [id], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  // Outros métodos relevantes para o modelo Post
}

export default Post;
