-- Altering username, password and host settings for the table to grant access to the nodejs backend.
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

-- Input values into User table
INSERT INTO users VALUES (1, "derekverghese", "Shreyas", "Verghese", "admin", "derekverghese@gmail.com", "../../assets/images/account_image_0.png", "2019-09-15");

-- User table commands
SELECT * FROM users;
SELECT * FROM logged_in;
SELECT * FROM user_history;
SELECT * FROM users WHERE userId = 1;
SELECT COUNT(*) AS userCount FROM users;

UPDATE users SET userEmail = "derekverghese@gmail.com" WHERE userId = 1;
UPDATE users SET userDP = "../../assets/images/shreyasverghese.jpg" WHERE userId = 1;

DELETE FROM logged_in;