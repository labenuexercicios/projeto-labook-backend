-- Active: 1683035450919@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        dislikes INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        creator_id TEXT NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );
    CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER DEFAULT (0) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (post_id) REFERENCES posts (id)
    );
    
SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;

DROP TABLE likes_dislikes;

INSERT INTO users (id, name, email, password)
VALUES ("u001", "Michelle Antunes", "michelle@email.com", "paswword123");
INSERT INTO posts (id, content, likes, dislikes,creator_id)
VALUES ("p001", "Hoje vamos estudar muito!", 1, 0, "u001");