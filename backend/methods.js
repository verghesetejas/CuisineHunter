const validator = require('./validation.js');
const logger = require('./logger.js').Logger;
const request = require('request');

var methods = {};

methods.getUsers = (req, res) => {
    validator.data.validateUsers(req, res);
}

methods.getUser = (req, res) => {
    validator.data.validateUser(req, res);
}

methods.getUserId = (req, res) => {
    validator.data.validateUserId(req, res);
};

methods.getUserCount = (req, res) => {
    validator.data.validateUserCount(req, res);
};

methods.postUser = function (req, res) {
    validator.data.validatePostUser(req, res);
}

methods.putUser = function (req, res) {
    validator.data.validatePutUser(req, res);
}

methods.removeUser = function (req, res) {
    validator.data.validateDeleteUser(req, res);
}
 
exports.data = methods;
