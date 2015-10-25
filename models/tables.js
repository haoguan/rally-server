"use strict";

let nano = require('./db');
let utils = require('./utils');

/*
 * @return JSON with status code and message
 */
let reset_db = function(dbs, callback) {
  for (let db_name of dbs) {
    nano.client.db.destroy(db_name, function(err, body) {
      if (err) {
        console.log(body);
        let error_text = `Database ${db_name} failed to delete`; 
        // Return early
        return callback(new Error(error_text), utils.to_json(500, error_text));
      }
      nano.client.db.create(db_name, function(err, body) {
        if (err) {
          console.log(body);
          let error_text = `Database ${db_name} failed to create`; 
          return callback(new Error(error_text), utils.to_json(500, error_text));
        }
      });
    });   
  }
  console.log("Databases added successfully.");
  callback(null, utils.to_json(200, "Reset successful"));
}

module.exports = {
  reset_dbs: reset_db
}