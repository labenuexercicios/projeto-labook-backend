-- Active: 1701628502328@@127.0.0.1@3306


PRAGMA foreign_keys=on;


CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME())
);

DROP TABLE IF EXISTS users;

INSERT INTO users (id, name, email, password) 
VALUES ('u001', 'Fulano', 'fulano@email.com', 'fulano123'),
       ('u002', 'Beltrana', 'beltrana@email.com', 'beltrano123'),
       ('u003', 'Astrodev', 'astrodev@email.com', 'astrodev99');


SELECT * FROM users;

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL REFERENCES users (id),
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()),
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

DROP TABLE IF EXISTS posts;

INSERT INTO posts (id, creator_id, content, likes, dislikes, updated_at)
VALUES ('1', 'u003', 'postagem 1', 10, 2, (DATETIME()));

SELECT * FROM posts;


DELETE FROM posts WHERE id = '2';


DELETE FROM posts;


CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL REFERENCES users (id),
    post_id TEXT NOT NULL REFERENCES posts (id),
    like INTEGER NOT NULL,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

DROP TABLE IF EXISTS likes_dislikes;

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES ('u001', '1', 1), 
       ('u002', '1', -1),
       ('u003', '2', 1); 


SELECT * FROM likes_dislikes;
