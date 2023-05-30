-- Active: 1685451277897@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

create TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(creator_id) REFERENCES users(id)
);

create TABLE likes_dislikes (
    user_id TEXT,
    post_id text,
    like INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);


-- INSERT INTO users (id, name, email, password, role)
-- VALUES
-- 	('u001', 'Fulano', 'fulano@email.com', 'fulano123', 'NORMAL'),
-- 	('u002', 'Beltrana', 'beltrana@email.com', 'beltrana00', 'NORMAL'),
-- 	('u003', 'Astrodev', 'astrodev@email.com', 'astrodev99', 'ADMIN');
