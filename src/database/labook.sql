-- Active: 1699018831967@@127.0.0.1@3306
DROP TABLE users;
CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
     created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);

INSERT INTO users(id, name, email, password, role)
VALUES
('u001', 'Anderson', 'anderson@email.com', 'and@123', 'admin'),
('u002', 'Patricia', 'patricia@email.com', 'pati@123', 'user'),
('u003', 'Everton', 'everton@email.com', 'eve@123', 'user'),
('u004', 'Jeferson', 'jeferson@email.com', 'jef@123', 'user');

SELECT * FROM users;

