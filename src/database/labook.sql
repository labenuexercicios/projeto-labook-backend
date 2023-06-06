-- Active: 1685203267759@@127.0.0.1@3306

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
 
 -- tipo NORMAL e senha = fulano123
	('u001', 'Pedro', 'pedro@email.com', '$2a$12$qPQj5Lm1dQK2auALLTC0dOWedtr/Th.aSFf3.pdK5jCmYelFrYadC', 'NORMAL'),

-- tipo NORMAL e senha = beltrana00
	('u002', 'Tiago', 'tiago@email.com', '$2a$12$403HVkfVSUbDioyciv9IC.oBlgMqudbnQL8ubebJIXScNs8E3jYe2', 'NORMAL'),

-- tipo ADMIN e senha = astrodev99
	('u003', 'Administrador', 'adm@email.com', '$2a$12$lHyD.hKs3JDGu2nIbBrxYujrnfIX5RW5oq/B41HCKf7TSaq9RgqJ.', 'ADMIN');


CREATE TABLE post (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,BIGINT,
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO post (id, creator_id, content)
VALUES
 ('p001', 'u001', 'Mussum Ipsum, cacilds vidis litro abertis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis'),
 ('p002', 'u002', 'Detraxit consequat et quo num tendi nada.In elementis mé pra quem é amistosis quis leo.Nec orci ornare consequat.');

 DROP TABLE post;

 CREATE TABLE likes_dislikes (
    user_id TEXT  NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
 );

 DROP TABLE likes_dislikes;
 DROP TABLE post;
 DROP TABLE users;
 
 --Teste like e dislikes--

 INSERT INTO likes_dislikes (user_id, post_id, like)
 VALUES
 ('u002' , 'p001' , 1),
 ('u001' , 'p002' , 1),
 ('u003' , 'p002' , 0);
