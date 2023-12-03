-- Active: 1701629083396@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT UNIQUE NOT NULL,
    --role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now','localtime'))
);

DROP TABLE IF EXISTS users;

INSERT INTO users (id, name, email, password) 
VALUES ('u001', 'Teste1', 'teste1@email.com', 'teste1'),
       ('u002', 'Teste2', 'teste2@email.com', 'teste2'),
       ('u003', 'Teste3', 'teste3@email.com', 'teste3');

SELECT * FROM users;

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL REFERENCES users (id),
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

INSERT INTO posts (id, creator_id, content, likes, dislikes, updated_at),
VALUES ('1', 'Teste1', 'Conteúdo do Post 1', 15, 5, (DATETIME('now','localtime')));

SELECT * FROM posts;

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL REFERENCES users (id),
    post_id TEXT NOT NULL REFERENCES posts (id),
    like INTEGER NOT NULL,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES ('u001', '1', 1), 
       ('u002', '1', -1), 
       ('u003', '2', 1);  
     

SELECT * FROM likes_dislikes;

DROP TABLE IF EXISTS likes_dislikes;