const express = require('express');
const request = require('request');
const app = express();
const router = express.Router();
const port = process.env.PORT || 1337;

const logger = require('./logger.js').Logger;
const methods = require('./methods.js').data;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api', router);

router.get('/home', function (req, res) {
  logger.log("Router location: " + req.url);
  res.sendfile('index.html');
});

// GET All Users
router.get('/users', function (req, res) {
  logger.log("Retrieving All User!");
  methods.getUsers(req, res);
});

// GET User with user ID
router.get('/users/:id', function (req, res) {
  logger.log("Retrieving User ID: " + req.params.id);
  methods.getUser(req, res);
});

// GET User count
router.get('/countusers', function (req, res) {
  logger.log('Retrieving User Count.');
  methods.getUserCount(req, res);
});

// GET Logged-in User
router.get('/loggedusers', function (req, res) {
  logger.log('Retrieving Logged-in User');
  methods.getLoggedUser(req, res);
});

// GET User ID with userName and UserPass
router.get('/users/:userName/:userPass', function (req, res) {
  logger.log("Retrieving User: " + req.params.userName);
  methods.getUserId(req, res);
});

// POST
router.post('/postuser', function (req, res) {
  logger.log("Creating a new Employee");
  methods.postUser(req, res);
});

// POST Logged-in table
router.post('/postloggeduser', function (req, res) {
  logger.log("Loading Current User");
  methods.postLoggedUser(req, res);
});

// PUT
router.put('/putuser/:id', function (req, res) {
  logger.log("Updating User ID: " + req.params.id);
  methods.putUser(req, res);
});

// DELETE
router.delete('/users/:id', function (req, res) {
  logger.log("Removing User ID: " + req.params.id);
  methods.removeUser(req, res);
});

// DELETE all from logged-in table
router.delete('/loggedusers', function (req, res) {
  logger.log("Removing All Logged Users");
  methods.removeLoggedUser(req, res);
});

app.listen(port, function () {
  logger.log(`Listening to port: ${port}...`);
  console.log(`Listening to port: ${port}...`);
});