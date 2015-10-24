"use strict";

var tables = require("../models/tables");
var utils = require("../models/utils")

/*
 * Exports
 */

module.exports = {
  reset_db: function(req, res) {
    let dbs = ["users", "groups", "rallies", "votes", "invitations"];
    tables.reset_dbs(dbs, function(err, resp) {
      res.status(resp["status"]).send(resp);
    });
  }
}