 CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    name VARCHAR(24),
    email VARCHAR(24),
    pwd VARCHAR(32),
    PRIMARY KEY(id)
);

INSERT INTO users (name, email, pwd) VALUES ('Test User', 'testuser@example.com', 'test');