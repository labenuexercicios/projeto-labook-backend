-- Active: 1701628502328@@127.0.0.1@3306


PRAGMA foreign_keys=on;

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME())
);

-- DROP TABLE IF EXISTS users;

INSERT INTO users (id, name, email, password, role) 
VALUES ('u001', 'Fulano', 'fulano@email.com', 'fulano123', 'user'),
       ('u002', 'Beltrana', 'beltrana@email.com', 'beltrano123', 'user'),
       ('u003', 'Astrodev', 'astrodev@email.com', 'astrodev99', 'user');


SELECT * FROM users;


CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()),
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);


-- DROP TABLE IF EXISTS posts;

INSERT INTO posts (id, creator_id, content, likes, dislikes, updated_at)
VALUES 
  ('p001', 'u001', 'Postagem do usuário u001', 5, 1, DATETIME('now')),
  ('p002', 'u002', 'Postagem do usuário u002', 8, 3, DATETIME('now')),
  ('p003', 'u003', 'Postagem do usuário u003', 12, 2, DATETIME('now'));


SELECT * FROM posts;


DELETE FROM posts WHERE id = '2';


DELETE FROM posts;


CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    post_id TEXT NOT NULL REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE,
    like INTEGER NOT NULL,
    PRIMARY KEY (user_id, post_id)
);

-- DROP TABLE IF EXISTS likes_dislikes;

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES ('u001', 'p001', 1), 
       ('u002', 'p001', -1),
       ('u003', 'p002', 1); 


SELECT * FROM likes_dislikes;
