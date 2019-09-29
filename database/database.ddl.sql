-- Create a database for CuisineHunter App
CREATE DATABASE IF NOT EXISTS cuisinehunter;
-- DROP DATABASE cuisinehunter;
USE cuisinehunter;

-- Create a table for user profile
CREATE TABLE users (
	userId INT UNSIGNED NOT NULL,
	userName VARCHAR(25) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    userPass VARCHAR(16) NOT NULL,
    userEmail VARCHAR(50) UNIQUE,
    userDP VARCHAR(100),
    joinDate DATE NOT NULL, -- date format 'yyyy-MM-dd'
	PRIMARY KEY (userId)
);
