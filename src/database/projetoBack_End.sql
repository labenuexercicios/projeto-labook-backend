-- Active: 1683738400790@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        dislikes INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );



SELECT * FROM users;
SELECT * FROM posts;

DROP TABLE users;
DROP TABLE posts;


INSERT INTO
    users (id, name, email, password, role)
VALUES
   
    -- tipo ADMIN e senha = astrodev99 
    (
        'u003',
        'Astrodev',
        'astrodev@email.com',
        '$2a$12$lHyD.hKs3JDGu2nIbBrxYujrnfIX5RW5oq/B41HCKf7TSaq9RgqJ.',
        'ADMIN'
    );

INSERT INTO
    posts (id, creator_id, content)
VALUES (
        'p001',
        'u003',
        'Olá'
    );
     

INSERT INTO
    likes_dislikes (user_id, post_id, like)
VALUES  ('u003', 'p001', 1),  ('u003', 'p002', 0);

