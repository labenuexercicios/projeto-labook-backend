-- Active: 1675433960973@@127.0.0.1@3306


CREATE TABLE users (
    id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);


INSERT INTO users (id, name, email, password, role)
VALUES
   ("u001", "Bruno", "bruno@email.com", "bruno123", "admin");


SELECT * FROM users;

DROP TABLE users;


CREATE TABLE posts (
    id TEXT UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    created_at TEXT DEFAULT(DATETIME()),
    updated_at TEXT DEFAULT(DATETIME()),
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

INSERT INTO posts(id, creator_id, content, likes)
VALUES
    ("p001", "u001", "motos", 1);

SELECT * FROM posts;

DROP TABLE posts;


CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER, 
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);


INSERT INTO likes_dislikes (user_id, post_id)
VALUES
   ("u001", "p001");

SELECT * FROM likes_dislikes;

DROP TABLE likes_dislikes;

