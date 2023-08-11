-- Active: 1690154905379@@127.0.0.1@3306
CREATE TABLE if NOT EXISTS users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now')) NOT NULL 
);
CREATE TABLE if NOT EXISTS posts(    
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now')) NOT NULL ,
    updated_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)  
    ON UPDATE CASCADE
    ON DELETE CASCADE  
);
CREATE TABLE if NOT EXISTS likes_dislikes(    
    user_id TEXT UNIQUE NOT NULL,
    post_id TEXT UNIQUE NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id), 
    FOREIGN KEY (post_id) REFERENCES posts(id)  
    ON UPDATE CASCADE
    ON DELETE CASCADE   
);

INSERT into users(id, name, email, password, role, created_at)
VALUES
("u001", "Samuel", "samuel@email.com", "samuelsenha", "admin", DATETIME('now')),
("u002", "Flavia", "flavia@email.com", "flaviasenha", "moderator", DATETIME('now')),
("u003", "Julia", "julia@email.com", "juliasenha", "student", DATETIME('now')),
("u004", "Rodrigo", "rodrigo@email.com", "rodrigosenha", "student", DATETIME('now')),
("u005", "Pedro", "pedro@email.com", "pedrosenha", "student", DATETIME('now'));
