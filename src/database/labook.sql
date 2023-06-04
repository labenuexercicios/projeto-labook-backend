-- Active: 1684807080900@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT PK UNIQUE NOT NULL ,
  name TEXT  NOT NULL,
  email TEXT  NOT  NULL,
  password TEXT NOT  NULL,
  role TEXT NOT NULL ,
  created_at TEXT DEFAULT (DATETIME('now')) NOT NULL
);
DROP TABLE users;

CREATE TABLE posts (
  id TEXT PK UNIQUE NOT  NULL,
  creator_id TEXT NOT  NULL,
  content TEXT NOT  NULL,
  likes INTEGER NOT  NULL,
  dislikes INTEGER NOT  NULL,
  created_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
     FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE CASCADE

);
DROP TABLE posts;

CREATE TABLE likes_dislikes (
  user_id TEXT NOT  NULL,
  post_id TEXT NOT  NULL,
  like INTEGER NOT  NULL,
   FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
);

DROP TABLE likes_dislikes;

--populando as seguintes tabelas: users, posts e likes_dislikes


INSERT INTO users(id, name, email, password, role )
VALUES("a01", "Cleiton", "celiocleiton@gmail.com", "cleiton123", "ADMIN"),
("a02", "Roberto", "roberto@gmail.com", "roberto123", "NORMAL"),
("a03", "Carlos", "carlos@gmail.com", "carlos123", "NORMAL"),
("a04", "Roberto Carlos", "robertocarlos@gmail.com", "robertocarlos123", "NORMAL"), 
("a05", "Marcus", "marcus@gmail.com", "marcus123", "NORMAL");
INSERT INTO users(id, name, email, password, role )
VALUES

("a06", "Célio Cleiton", "celio@gmail.com", "celio123", "NORMAL");



INSERT INTO posts(id, creator_id,  content, likes, dislikes  )
VALUES("p01", "a01", "Imagem na festa", 1, 0 ),
("p03", "a02", "Imagem na casa", 0, 1 ),
("p02", "a03", "Imagem no trabalho", 1, 0 ),
("p05", "a04", "Imagem com a esposa", 1, 0 ),
("p04", "a05", "Imagem no japão", 1 , 0 );

DROP TABLE posts;

INSERT INTO likes_dislikes( user_id,  post_id,  like  )
VALUES("a01", "p03", 100 ),
("a02", "p02", 145 ),
("a03", "p01", 236 ),
("a04", "p04", 600 ),
("a01", "p04", 255 )
;

DROP TABLE likes_dislikes;
--verificando as tabelas
SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;

DROP TABLE posts;

SELECT
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.name AS creator_name
FROM posts
JOIN users
ON posts.creator_id = users.id;