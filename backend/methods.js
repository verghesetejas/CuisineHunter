const validator = require('./validation.js');
const logger = require('./logger.js').Logger;
const request = require('request');

var methods = {};

methods.getUsers = (req, res) => {
    validator.data.validateUsers(req, res);
};

methods.getUser = (req, res) => {
    validator.data.validateUser(req, res);
};

methods.getUserId = (req, res) => {
    validator.data.validateUserId(req, res);
};

methods.getUserCount = (req, res) => {
    validator.data.validateUserCount(req, res);
};

methods.getLoggedUser = (req, res) => {
    validator.data.validateLoggedUser(req, res);
};

methods.postUser = function (req, res) {
    validator.data.validatePostUser(req, res);
};

methods.postLoggedUser= function (req, res) {
    validator.data.validatePostLoggedUser(req, res);
};

methods.putUser = function (req, res) {
    validator.data.validatePutUser(req, res);
};

methods.removeUser = function (req, res) {
    validator.data.validateDeleteUser(req, res);
};

methods.removeLoggedUser = function (req, res) {
    validator.data.validateDeleteLoggedUser(req, res);
};
 
exports.data = methods;
