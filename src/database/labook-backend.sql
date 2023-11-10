-- Active: 1698525275723@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

INSERT INTO users (id, name, email, password, role)
VALUES 
    ('u001', 'Fulano', 'fulano@gmail.com', 'fulano123', 'admin'),
    ('u002', 'Beltrano', 'beltrano@gmail.com', 'beltrano123', 'user');

INSERT INTO posts (id, creator_id, content, updated_at)
VALUES
    ('p001', 'u001', 'Eai', 'never'),
    ('p002', 'u002', 'SHow man', 'never');

SELECT * FROM users;
SELECT * FROM posts;


