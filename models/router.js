"use strict";

// let base = require('./base');
let express = require('express');
// let nano = require('./db');
var setup = require('../routes/setup');
let router = express.Router();
let groups = require("../routes/group");

/**
 * Routes
 */
// router.get("/", function(req, res) {
//   res.render('index', { title: 'Express' });
// });
// router.use("/reset", setup.reset());
// router.use("/reset", groups);

/**
 * Users
 * @param username
 * @param password
 * @param phone number
 */

// router.post("/users", function(req, res, next) {
//   let users_db = nano.client.use('users');

//   users_db.insert({
//     username: req.username,
//     password: req.password,
//     number: req.number
//   }, function(err, body) {
//     if (!err) console.log(body);
//   });
// });


// module.exports = {
//   router : router
// }