-- Active: 1684451342635@@127.0.0.1@3306


CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT('NORMAL') NOT NULL,
        created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL
    );

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        dislikes INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY(post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

SELECT * FROM users;

SELECT * FROM posts;

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
    INNER JOIN users ON users.id = posts.creator_id;

SELECT * FROM likes_dislikes;

INSERT INTO
    users (id, name, email, password, role)
VALUES (
        "u001",
        "Clara",
        "Clara@email.com",
        "CF@123456",
        "ADMIN"
    ), (
        "u002",
        "Carlos",
        "Carlos@email.com",
        "Carlos@123456",
        "NORMAL"
    );

INSERT INTO
    posts (id, creator_id, content)
VALUES (
        "p001",
        "u001",
        "Começando o último projeto de backend da Labenu!"
    ), (
        "p002",
        "u001",
        "Que preguiça de fazer projeto em uma sexta-feira chuvosa! haha"
    ), (
        "p003",
        "u002",
        "Buscando indicações de vagas junior para minha esposa!"
    );