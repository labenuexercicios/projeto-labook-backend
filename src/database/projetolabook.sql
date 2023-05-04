-- Active: 1680611544484@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, role)
VALUES
	('u001', 'Fulano', 'fulano@email.com', 'fulano123', 'NORMAL'),
	('u002', 'Beltrana', 'beltrana@email.com', 'beltrana00', 'NORMAL'),
	('u003', 'Astrodev', 'astrodev@email.com', 'astrodev99', 'ADMIN');

DROP TABLE users;

CREATE TABLE posts (
    id text unique not null,
    creator_id text unique not null,
    content text not null,
    likes integer not null,
    dislikes integer not null,
    created_at text not null,
    update_at text not null,
    foreign key (creator_id) references users(id)
);

CREATE TABLE likes_dislikes(
    user_id text not null,
    post_id text not null,
    like integer not null,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;