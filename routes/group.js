"use strict";

let express = require('express');
let nano = require('../models/db');
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
  group_db.get(group_id, { rev_info: true})
    .then(function(group) {
      req.group = group;
      return next();
    }).catch(function(e) {
      req.error = utils.handle_couch_error(e);
      return next();
    });
  // group_db.get(group_id, { revs_info: true }, function(err, body) {
  //   if (err) {
  //     req.error = utils.handle_couch_error(err);
  //   } else {
  //     req.group = body;
  //   }
  //   return next();
  // });
});

/**
 * GET
 * @param group_id
 * @param user
 */
router.get("/groups/:group_id", function(req, res, next) {
  if (req.error) {
    res.status(req.error["status"]).send(req.error);
  } else {
    res.status(200).send(req.group);    
  }
});

/**
 * POST
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