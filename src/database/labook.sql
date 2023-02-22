-- Active: 1676050854055@@127.0.0.1@3306

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

CREATE TABLE
    posts(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    );

INSERT INTO
    users(id, name, email, password, role)
VALUES (
        "u001",
        "Bruno Maschietto",
        "brunoM@email.com",
        "bruno1234",
        "ADMIN"
    ), (
        "u002",
        "Lebron James",
        "lebronKing@email.com",
        "kingJames1234",
        "ADMIN"
    ), (
        "u003",
        "Maria Constance",
        "mariaconstance@email.com",
        "mariaC1234",
        "NORMAL"
    );

INSERT INTO
    posts(
        id,
        creator_id,
        content,
        likes,
        dislikes
    )
VALUES (
        "p001",
        "u001",
        "Hello World!",
        2,
        1
    ), (
        "p002",
        "u003",
        "Oi turma!",
        2,
        0
    ), (
        "p003",
        "u002",
        "King James babe!!!",
        1000,
        0
    );

SELECT * FROM users;

SELECT * FROM posts;

DELETE FROM users WHERE name = "Jayce";

DROP TABLE users;

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

SELECT * FROM posts;

