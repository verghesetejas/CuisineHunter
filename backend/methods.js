const validator = require('./validation.js');
const logger = require('./logger.js').Logger;
const request = require('request');

var methods = {};

methods.getUsers = (req, res) => {
    validator.data.validateUsers(req, res);
}

methods.getUser = function (req, res) {
    validator.data.validateUser(req, res);
}

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