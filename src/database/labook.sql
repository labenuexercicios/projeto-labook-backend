-- Active: 1692913625877@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, role)
VALUES
	('u001', 'Maria', 'maria@email.com', '$2a$12$qp5XcWAZLuCzkwvffpgRJuk/DU.5n02h87oU9fdwdeAIdPYCDMXF2', 'NORMAL'),
	('u002', 'Gilmar', 'gilmar@email.com', '$2a$12$f8hI6TwxpTpnOzIo9faSaeMKtRntZwOXmDtrzLhkhFSN8lXaZm0gK', 'NORMAL'),
	('u003', 'Henry', 'henry@email.com', '$2a$12$izRIjaSZUoULGRQnGOODVuYttPfoIToJp9Tf8tsGQTw913mux1giO', 'ADMIN');
CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

INSERT INTO posts (id, creator_id, content)
VALUES
  ('p001', 'u001', 'Education'),
  ('p002', 'u002', 'inspiration');

CREATE TABLE likes_dislikes (
  user_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES 
  ('u002', 'p001', 1),
  ('u003', 'p001', 1),
  ('u001', 'p002', 1),
  ('u003', 'p002', 0);


UPDATE posts
SET likes = 2
WHERE id = 'p001';

UPDATE posts
SET likes = 1, dislikes = 1
WHERE id = 'p002';




-- Queries de deleção abaixo:
DROP TABLE likes_dislikes;
DROP TABLE posts;
DROP TABLE users;


