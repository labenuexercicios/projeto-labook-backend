import sqlite from 'sqlite3';
import { User } from '../models';

class UserRepository {
  private db: sqlite.Database;

  constructor() {
    this.db = new sqlite.Database('path/to/your/database.db');
  }

  findById(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE id = ?', id, (error, row) => {
        if (error) {
          reject(error);
        } else if (!row) {
          resolve(null);
        } else {
          const user = new User(row.name, row.email, row.password, row.role);
          user.id = row.id;
          resolve(user);
        }
      });
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE email = ?', email, (error, row) => {
        if (error) {
          reject(error);
        } else if (!row) {
          resolve(null);
        } else {
          const user = new User(row.name, row.email, row.password, row.role);
          user.id = row.id;
          resolve(user);
        }
      });
    });
  }

  create(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
        [user.id, user.name, user.email, user.password, user.role],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(user);
          }
        }
      );
    });
  }
  
  // Outras operações como update e delete
}

export default UserRepository;
