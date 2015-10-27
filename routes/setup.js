"use strict";

let express = require('express');
let request = require('request');
let nano = require('../models/nano');
let utils = require('../models/utils');
let router = express.Router();

/*
 * @return JSON with status code and message
 */
let reset_dbs = function(dbs) {
  for (let db_name of dbs) {
    nano.request({
      db: db_name,
      method: 'get'
    }).then(function(body) {
      return nano.db.destroy(db_name);
    }).then(function(body) {
      return nano.db.create(db_name);
    }).catch(function(e) {
      // what to do if error was from nano.db.create?
      return nano.db.create(db_name);
    });
  }
  console.log("Databases added successfully.");
  return utils.to_json(200, "Reset successful");
}

/*
 * Setup
 */

router.get("/reset", function(req, res) {
  // Users group by default
  let dbs = ["groups", "rallies", "votes", "invitations"];
  let ret = reset_dbs(dbs);
  res.status(ret["status"]).send(ret);
});

module.exports = {
  router : router,
  // For unit testing
  reset_dbs : reset_dbs
}