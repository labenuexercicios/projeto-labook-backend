-- Active: 1693002778961@@127.0.0.1@3306
-- Active: 1691620016504@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

DROP TABLE users;

CREATE TABLE posts (
  id TEXT NOT NULL UNIQUE,
  creator_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INT NOT NULL,
  dislikes INT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (creator_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);




CREATE TABLE likes_dislikes (
  user_id TEXT NOT NULL REFERENCES users(id),
  post_id TEXT NOT NULL REFERENCES posts(id),
  like INTEGER NOT NULL,
  PRIMARY KEY (user_id, post_id)
);
