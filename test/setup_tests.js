"use strict";

let utils = require("../models/utils");
let nano = require('../models/nano');
let setup = require("../routes/setup")
let assert = require('assert');

// Test dbs
let dbs = ["unit"];

/*
 * tables
 */
suite('setup', function() {

  // Delete test databases
  teardown(function() {
    for (let db_name of dbs) {
      nano.request({
        db: db_name,
        method: 'get'
      }).then(function(body) {
        return nano.db.destroy(db_name);
      }).catch(function(e) {
        console.log("cannot delete db that doesn't exist");
      });  
    }
  });

  suite("#reset_dbs()", function() {
    test("should return json with status code and message", function() {
      assert.deepEqual({
        status: 200,
        message: "Reset successful"
      }, setup.reset_dbs(dbs));
    });
  });
});