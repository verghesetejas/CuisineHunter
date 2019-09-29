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
}

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
}

validate.validatePostUser = (req, res) => {
    let user = req.body;
    let sql = `
        INSERT INTO users VALUES (
            ${user.userId},
            ${user.userName},
            ${user.firstName},
            ${user.lastName},
            ${user.userPass},
            ${user.userEmail},
            ${user.userDP},
            ${user.joinDate},
        )
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        if (!result) {
            logger.log('Error 404: Not Found');
            res.status(404).send('Error 404: Not Found');
            return;
        }
        // rows.forEach(element => {
        //     if (element.constructor == Array) {
        //         res.send("Inserted User ID: " + element[0].userId);
        //     }
        // });
        res.send(result);
    });
}

validate.validatePutUser = (req, res) => {
    let user = req.body;
    let sql = `
        SET @userId=${user.userId}; @userName=${user.userName}; @firstName=${user.firstName}; 
        @lastName=${user.lastName}; @userPass=${user.userPass}; @userEmail=${user.userEmail};
        @userDP=${user.userDP}; @joinDate=${user.joinDate}; CALL UserAddOrEdit(
            @userId, @userName, @firstName, 
            @lastName, @userPass, @userEmail,
            @userDP, @joinDate
        );
    `;
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
}

validate.validateDeleteUser = (req, res) => {
    let user;
    con.query(`DELETE FROM users WHERE userId = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        console.log(result);
        user = result ? "User Record Deleted" : err.message;
        if (!user) {
            logger.log('Error 404: Invalid ID value');
            res.status(404).send('Error 404: Invalid ID value');
            return;
        }
        res.send(user);
    });
}

exports.data = validate;
