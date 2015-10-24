"use strict";

let utils = require("../models/utils");
let nano = require('../models/db');
let tables = require("../models/tables")
let assert = require('assert');

// Test dbs
let dbs = ["unit", "testing", "rocks"];


/*
 * tables
 */
suite('tables', function() {

  // Delete test databases
  teardown(function() {
    for (let db_name of dbs) {
      nano.client.db.destroy(db_name, function(err, body){
        if (err) throw err;
      });      
    }
  });

  suite("#reset_dbs()", function() {
    test("should return json with status code and message", function() {
      tables.reset_dbs(dbs, function(err, resp) {
        if (err) throw err;
      });
    });
  });
});