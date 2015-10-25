"use strict";

/*
 * Utility
 */

let json_resp = function(status, message) {
  return {
    status: status,
    message: message
  }
}

let handle_couch_error = function(err) {
  return {
    type: err["error"],
    status: err["statusCode"],
    message: err["description"],
    request_url: err["request"]["uri"]
  }
}

module.exports = {
  to_json: json_resp,
  handle_couch_error: handle_couch_error
}