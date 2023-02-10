-- Active: 1676040232967@@127.0.0.1@3306

CREATE TABLE users (
     id TEXT PRIMARY KEY DEFAULT NULL,
     name TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL,
     role TEXT DEFAULT NULL,
     created_at TEXT DEFAULT (DATETIME('now')) NOT NULL
);

CREATE TABLE posts (
    id TEXT UNIQUE NOT NULL,
    creator_id TEXT NOT NULL ,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at  TEXT DEFAULT (DATETIME('now')) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME('now')) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

INSERT INTO users (id, name, email, password, role)
VALUES
("u001", "Bianca", "bianca_29@gmail.com", "Bianca56_9*0", "user"),
("u002", "Bruna", "bruna_23@gmail.com", "Br7890_*s2", "user"),
("u003", "William", "will_kennedy@gmail.com", "will-linkedin90", "user"),
("u004", "Thiago", "thiagoricardo@gmail.com", "thiagor-78.0", "user"),
("u005", "Giovanna", "gio912@gmail.com", "gio/*908i0u", "user"),
("u006", "Mônica", "monica_bispo@gmail.com", "monica-valerio814", "user"),
("u007", "Paulo", "paulovieira_358@gmail.com", "paulo*ghu54", "user"),
("u008", "Alan", "targ_alan@gmail.com", "alan_targ987", "user"),
("u009", "Gleiciane", "glelima3@gmail.com", "gle_lima@wer", "user"),
("u010", "Sandro", "sandro90ir@gmail.com", "sandro8*ir56", "user");

SELECT * FROM users;

DROP TABLE users;

INSERT INTO posts (id, creator_id, content, likes, dislikes)
VALUES
("c001", "u001", "video de bicicleta", 89, 5),
("c002", "u002", "foto pessoal", 310, 4),
("c003", "u003", "video de memes", 125, 2),
("c004", "u004", "video de códigos", 65, 5),
("c005", "u005", "reels de viagens", 210, 9),
("c006", "u006", "video de receita", 75, 3),
("c007", "u007", "reels de futebol", 99, 8),
("c008", "u008", "reels de carro", 155, 7),
("c009", "u009", "foto de viagens", 305, 1),
("c010", "u010", "video de futebol", 87, 9);

SELECT * FROM posts;

DROP TABLE posts;

INSERT INTO likes_dislikes(user_id, post_id, like)
VALUES
("u001", "p01", 89),
("u002", "p02", 310),
("u003", "p03", 125),
("u004", "p04", 65),
("u005", "p05", 210),
("u006", "p06", 75),
("u007", "p07", 99),
("u008", "p08", 155),
("u009", "p09", 305),
("u010", "p10", 87);

SELECT * FROM likes_dislikes;

DROP TABLE likes_dislikes;



