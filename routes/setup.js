"use strict";

let express = require('express');
let request = require('request');
let nano = require('../models/db');
let utils = require('../models/utils');
let router = express.Router();

/*
 * @return JSON with status code and message
 */
let reset_dbs = function(dbs, callback) {
  for (let db_name of dbs) {
    nano.db.destroy(db_name, function(err, body) {
      // Should we log if there is an error in destroying?
      nano.db.create(db_name, function(err, body) {
        if (err) {
          return callback(err, body);
        }
      });
    });   
  }
  console.log("Databases added successfully.");
  callback(null, utils.to_json(200, "Reset successful"));
}

/*
 * Setup
 */

router.get("/reset", function(req, res) {
  let dbs = ["users", "groups", "rallies", "votes", "invitations"];
  reset_dbs(dbs, function(err, resp) {
    if (err) {
      let couch_error = utils.handle_couch_error(err);
      res.status(couch_error["status"]).send(couch_error);
    } else {
      res.status(resp["status"]).send(resp);
    }
  });
});

module.exports = {
  router : router,
  // For unit testing
  reset_dbs : reset_dbs
}