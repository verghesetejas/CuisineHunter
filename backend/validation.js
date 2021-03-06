const mysql = require('mysql');
const logger = require('./logger.js').Logger;

var validate = {};
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "cuisinehunter",
    multipleStatements: true
});

con.connect((err) => {
    if (err) throw err;
    logger.log("Connected!");
    console.log("Connected!");
});

validate.validateUsers = (req, res) => {
    let users;
    con.query(`SELECT * FROM users`, (err, result) => {
        if (err) throw err;
        console.log(result);
        users = result;
        if (!users) {
            logger.log('Error 404: No Users Found');
            res.status(404).send('Error 404: No Users Found');
            return;
        }
        res.send(users);
    });
};

validate.validateUser = (req, res) => {
    let user;
    con.query(`SELECT * FROM users WHERE userId = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        console.log(result);
        user = result;
        if (!user) {
            logger.log('Error 404: Invalid ID value');
            res.status(404).send('Error 404: Invalid ID value');
            return;
        }
        res.send(user);
    });
};

validate.validateUserId = (req, res) => {
    let user;
    con.query(`
        SELECT userId FROM users
        WHERE userName = \"${req.params.userName}\"
        AND userPass = \"${req.params.userPass}\"`, (err, result) => {
        if (err) throw err;
        console.log(result);
        user = result;
        if (!user) {
            logger.log('Error 404: Invalid Username or Password value');
            res.status(404).send('Error 404: Invalid Username or Password value');
            return;
        }
        res.send(user);
    });
};

validate.validateUserCount = (req, res) => {
    let count;
    con.query(`SELECT count(*) as userCount FROM users`, (err, result) => {
        if (err) throw err;
        console.log(result);
        count = result;
        if (!count) {
            logger.log('Error 404: Could Not Retrieve data from backend');
            res.status(404).send('Error 404: Could Not Retrieve data from backend');
            return;
        }
        res.send(count);
    });
};

validate.validateLoggedUser = (req, res) => {
    let user;
    con.query(`SELECT userId FROM logged_in`, (err, result) => {
        if (err) throw err;
        console.log(result);
        user = result;
        if (!user) {
            logger.log('Error 404: Could Not Retrieve data from backend');
            res.status(404).send('Error 404: Could Not Retrieve data from backend');
            return;
        }
        res.send(user);
    });
};

validate.validateUserHistory = (req, res) => {
    let user;
    con.query(`SELECT * FROM user_history WHERE userId = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        console.log(result);
        user = result;
        if (!user) {
            logger.log('Error 404: Could Not Retrieve data from backend');
            res.status(404).send('Error 404: Could Not Retrieve data from backend');
            return;
        }
        res.send(user);
    });
};

validate.validatePostUser = (req, res) => {
    let user = req.body;
    let sql = `INSERT INTO users
        VALUES (${user.userId}, \"${user.userName}\", \"${user.firstName}\",
        \"${user.lastName}\", \"${user.userPass}\", \"${user.userEmail}\",
        \"${user.userDP}\", \"${user.joinDate}\")`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        if (!result) {
            logger.log('Error 404: Not Found');
            res.status(404).send('Error 404: Not Found');
            return;
        }
        res.send(result);
    });
};

validate.validatePostLoggedUser = (req, res) => {
    let user = req.body;
    let sql = `INSERT INTO logged_in
        VALUES (0, ${user.userId})`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        if (!result) {
            logger.log('Error 404: Not Found');
            res.status(404).send('Error 404: Not Found');
            return;
        }
        res.send(result);
    });
};

validate.validatePostUserHistory = (req, res) => {
    let user = req.body;
    let sql = `INSERT INTO user_history
        VALUES (0, \"${user.searchQuery}\", \"${user.linksClicked}\", ${user.userId})`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        if (!result) {
            logger.log('Error 404: Not Found');
            res.status(404).send('Error 404: Not Found');
            return;
        }
        res.send(result);
    });
};

validate.validatePutUser = (req, res) => {
    let user = req.body;
    let sql = `UPDATE users SET userName = \"${user.userName}\", firstName = \"${user.firstName}\", lastName = \"${user.lastName}\", userPass = \"${user.userPass}\", userEmail = \"${user.userEmail}\", userDP = \"${user.userDP}\", joinDate = \"${user.joinDate}\" WHERE userId = ${req.params.id}`;
    con.query(sql, (err, rows, result) => {
        if (err) throw err;
        console.log(result);
        if (!rows) {
            logger.log('Error 404: Not Found');
            res.status(404).send('Error 404: Not Found');
            return;
        }
        res.send("Updated User Data Successfully");
    });
};

validate.validateDeleteUser = (req, res) => {
    let user;
    con.query(`DELETE FROM users WHERE userId = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        console.log(result);
        user = result ? { response: "User Record Deleted" } : err.message;
        if (!user) {
            logger.log('Error 404: Invalid ID value');
            res.status(404).send('Error 404: Invalid ID value');
            return;
        }
        res.send(user);
    });
};

validate.validateDeleteLoggedUser = (req, res) => {
    let user;
    con.query(`DELETE FROM logged_in`, (err, result) => {
        if (err) throw err;
        console.log(result);
        user = result ? { response: "User Record Deleted" } : err.message;
        if (!user) {
            logger.log('Error 404: Invalid ID value');
            res.status(404).send('Error 404: Invalid ID value');
            return;
        }
        res.send(user);
    });
};

exports.data = validate;
