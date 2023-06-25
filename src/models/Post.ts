import sqlite from 'sqlite3';

interface PostData {
  id: string;
  title: string;
  content: string;
}

class Post {
  [x: string]: any;
  static getAll() {
      throw new Error('Method not implemented.');
  }
  save() {
      throw new Error('Method not implemented.');
  }
  static getById(id: any) {
      throw new Error('Method not implemented.');
  }
  static deleteById(id: any) {
      throw new Error('Method not implemented.');
  }
  private db: sqlite.Database;

  constructor() {
    this.db = new sqlite.Database('../database.db');
  }

  public getAll(): Promise<PostData[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM posts', (error: Error | null, rows: PostData[]) => {
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
      this.db.get('SELECT * FROM posts WHERE id = ?', [id], (error: Error | null, row: PostData) => {
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

  public create(post: PostData): Promise<PostData> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO posts (id, title, content) VALUES (?, ?, ?)',
        [post.id, post.title, post.content],
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

  public update(id: string, post: PostData): Promise<PostData | null> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [post.title, post.content, id],
        function (error) {
          if (error) {
            reject(error);
          } else if (this.changes === 0) {
            resolve(null);
          } else {
            resolve(post);
          }
        }
      );
    });
  }

  public delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM posts WHERE id = ?', [id], function (error) {
        if (error) {
          reject(error);
        } else if (this.changes === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}

export default Post;
