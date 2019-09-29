CREATE DEFINER=`root`@`localhost` PROCEDURE `UserAddOrEdit`(
	IN _userId INT,
    IN _userName VARCHAR(25),
    IN _firstName VARCHAR(50),
    IN _lastName VARCHAR(50),
    IN _userPass VARCHAR(16),
    IN _userEmail VARCHAR(50),
    IN _userDP BLOB,
    IN _joinDate DATE
)
BEGIN
	IF _userId = 0 THEN
		INSERT INTO users VALUES (_userId, _userName, _firstName, _lastName, _userPass, _userEmail, _userDP, _joinDate);
	ELSE
		UPDATE users
        SET
		userName = _userName,
		firstName = _firstName,
		lastName = _lastName,
		userPass = _userPass,
		userEmail = _userEmail,
		userDP = _userDP,
		joinDate = _joinDate
        WHERE userId = _userId;
	END IF;
    
    SELECT _userId AS 'userId';
END