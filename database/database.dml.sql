-- Altering username, password and host settings for the table to grant access to the nodejs backend.
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

-- Input values into User table
INSERT INTO users VALUES (1, "derekverghese", "Shreyas", "Verghese", "admin", "derekverghese@gmail.com", "D:\\\\Academia\\Workspace\\VSCode\\CuisineHunter\\src\\assets\\images\\account_image_0.png", "2019-09-15");
INSERT INTO users VALUES (2, "verghesetejas", "Tejas", "Verghese", "admin2", "verghesetejas@gmail.com", "D:\\\\Academia\\Workspace\\VSCode\\CuisineHunter\\src\\assets\\images\\account_image_0.png", "2019-09-15");

-- User table commands
SELECT * FROM users;
SELECT * FROM users WHERE userId = 1;