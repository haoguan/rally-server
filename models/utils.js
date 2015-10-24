/*
 * Utility
 */

var json_resp = function(status, message) {
  return {
    status: status,
    message: message
  }
}

module.exports = {
  to_json: json_resp
}