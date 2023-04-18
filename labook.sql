-- Active: 1681790768804@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);
CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO users (id, name, email, password, role)
VALUES
    ("u001", "Elton", "Elton@email.com", "Elton1!", "ADMIN"),
    ("u002", "Lucilene", "Lucilene@email.com", "Lucilene1!", "NORMAL");

INSERT INTO posts (id, creator_id, content)
VALUES
    ("p001", "u001", "Quero me tornar Dev!"),
    ("p002", "u001", "Pra cima deles!!!"),
    ("p003", "u002", "Agora não paro nunca!");

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u001", "p001", 45),
    ("u001", "p002", 25),
    ("u002", "p003", 37);

DROP TABLE users;
DROP TABLE posts;
DROP TABLE likes_dislikes;

SELECT * FROM posts;
SELECT * FROM likes_dislikes;
SELECT * FROM users;

SELECT  posts.id, posts.creator_id, posts.content, posts.likes, posts.dislikes, posts.created_at, posts.updated_at, users.name AS creator_name
FROM posts
JOIN users
ON posts.creator_id = users.id;

UPDATE users
SET password = "$2a$12$dFjaNcnEGwtaDJAv/njRCeZtp2ZN/UxXai4zt1znmYH.6dquTg7Y."
WHERE id = "u001";

UPDATE users
SET password = "$2a$12$B4yJn3dN6ytFJKo4hrWSV.DjJ41wWjTx5aF5yX7fgioMQw6OTaike"
WHERE id = "u002";