-- Active: 1685922222729@@127.0.0.1@3306

CREATE TABLE users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime())
);

CREATE TABLE posts (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER NOT NULL,
  dislikes INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime()),
  updated_at TEXT NOT NULL DEFAULT (datetime()),
  FOREIGN KEY (creator_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

SELECT * from likes_dislikes;

CREATE TABLE likes_dislikes (
  user_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
);


DROP Table likes_dislikes;
DROP Table users;
DROP Table posts;