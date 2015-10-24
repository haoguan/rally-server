"use strict";

let utils = require("../models/utils");
let assert = require('assert');

/*
 * to_json
 */

suite('utils', function() {
  suite("#to_json()", function() {
    test("should return json representation of inputs", function() {
      assert.deepEqual({
        status: 200,
        message: "success"
      }, utils.to_json(200, "success"));
    });
  });
});