"use strict";

let express = require('express');
let nano = require('../models/nano');
let router = express.Router();
let utils = require("../models/utils");

/**
 * Groups
 */

// TODO: authenticate user before allowing them to query!
router.param("group_id", function(req, res, next, group_id) {
  console.log(`Group id is $(group_id)`);
  // Fetch group record with id = group_id
  let group_db = nano.db.use('groups');
  group_db.get(group_id)
    .then(function(group) {
      req.result = {
        status: 200,
        result: group
      };
      return next();
    }).catch(function(e) {
      req.result = utils.handle_couch_error(e);
      return next();
    });
});

/**
 * GET groups by id
 * @param group_id
 * @param user
 */
router.get("/groups/:group_id", function(req, res, next) {
  res.status(req.result["status"]).send(req.result);
});

/**
 * GET all groups the user belongs to
 * @param user
 */
// TODO: GET THIS USING VIEWS FOR SORTED
router.get("/groups", function(req, res, next) {
  let group_db = nano.db.use('groups');
  // Without id in param, will use sequential uuid generator by default!
  // TODO: Need to add user to item so we can reference back to owner.
  group_db.get()
});


/**
 * POST a single group
 * @param title
 * @param owner - user id who created group
 */
router.post("/groups", function(req, res, next) {
  let group_db = nano.db.use('groups');
  // Without id in param, will use sequential uuid generator by default!
  // TODO: Need to add user to item so we can reference back to owner.
  group_db.insert({
    owner: req.owner,
    title: req.title
  }, function(err, body) {
    if (!err) console.log(body);
  });
});

module.exports = router;