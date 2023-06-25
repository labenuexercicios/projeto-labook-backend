import sqlite from 'sqlite3';
import User from '../models/User';

interface UserRow {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

class UserRepository {
  private db: sqlite.Database;

  constructor() {
    this.db = new sqlite.Database('./database.db');
  }

  findById(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE id = ?', [id], (error: Error | null, row: UserRow) => {
        if (error) {
          reject(error);
        } else if (!row) {
          resolve(null);
        } else {
          const user = new User(row.name, row.email, row.password);
          resolve(user);
        }
      });
    });
  }
  
  findByEmail(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE email = ?', [email], (error: Error | null, row: UserRow) => {
        if (error) {
          reject(error);
        } else if (!row) {
          resolve(null);
        } else {
          const user = new User(row.name, row.email, row.password);
          resolve(user);
        }
      });
    });
  }
  
  
  
  
  create(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
        [user.id, user.name, user.email, user.password],
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
