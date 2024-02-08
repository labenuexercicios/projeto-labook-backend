-- Active: 1701388054441@@127.0.0.1@3306

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
  -- tipo ADMIN e senha = useradmin
  ('u001', 'User', 'useradmin@email.com', '$2a$12$AJligeZ1vJNuIewjDJXbTe6Slwh1vpgQsyXZIsiMpXC3lA2lccD.m', 'ADMIN'),
  -- tipo NORMAL e senha = ruby000
  ('u002', 'Ruby', 'ruby@email.com', '$2a$12$cejBhsodaJ5eIg8gAWuVKuiPSn7fGZg6Vy6mIQSMOgMKQkKI.1jEy', 'NORMAL'),
  -- tipo NORMAL e senha = lee123
  ('u003', 'Lee', 'lee@email.com', '$2a$12$Xc4CiD/pQtJH/f9yAtBiOO1uaIbPaIeTpEBTtBMgT6c7V9zfDN/MG', 'NORMAL');
 

CREATE TABLE posts (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_id TEXT NOT NULL,
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
  ('p001', 'u002', 'Olá, tudo bem? Eu sou a Ruby!'),
  ('p002', 'u003', 'Olá, me chamo Lee'),
  ('p003', 'u001', 'Olá, eu sou o Usuário admnistrador desta rede social!');

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
  ('u001', 'p001', 1),
  ('u001', 'p002', 0),
  ('u002', 'p002', 0),
  ('u002', 'p003', 1),
  ('u003', 'p001', 0),
  ('u003', 'p003', 1);


UPDATE posts
SET likes = 1, dislikes = 1
WHERE id = 'p001';

UPDATE posts
SET dislikes = 2
WHERE id = 'p002';

UPDATE posts
SET likes = 2
WHERE id = 'p003';


DROP TABLE likes_dislikes;
DROP TABLE posts;
DROP TABLE users;
