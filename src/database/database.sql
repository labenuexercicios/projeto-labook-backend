-- Active: 1689639680032@@127.0.0.1@3306


CREATE TABLE
    users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME())
    );

INSERT INTO
    users(id, name, email, password, role)
VALUES (
        "u001",
        "Magali Bueno",
        "magali@email.com.br",
        "123456",
        "yes"
    ), (
        "u002",
        "Maira Simeone",
        "maira@email.com.br",
        "654321",
        "yes"
    ), (
        "u003",
        "Miguel Pinto",
        "miguel@email.com.br",
        "505051",
        "yes"
    );

CREATE TABLE
    post (
        id TEXT PRIMARY KEY NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER,
        dislikes INTEGER,
        created_at TEXT DEFAULT(DATETIME()),
        updated_at TEXT DEFAULT(DATETIME()),
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );

INSERT INTO
    post(
        id,
        creator_id,
        content,
        likes,
        dislikes
    )
VALUES (
        "p001",
        "u001",
        "Eu tenho gratidão",
        50,
        3
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TExt NOT NULL,
        like INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES post(id)
    );