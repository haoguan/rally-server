"use strict";

let connectionURL = process.env.DATABASE_URL || ('http://localhost:5984');
let client = require('nano-blue')(connectionURL);

module.exports = client;


