var fs = require('fs');
var Logger = exports.Logger = {};
var logFileStream = fs.createWriteStream('logs/file.log');

Logger.log = function (msg) {
    var message = new Date().toISOString() + " : " + msg + "\n";
    logFileStream.write(message);
};
