var connectionURL = process.env.DATABASE_URL || ('http://localhost:5984');
client = require('nano')(connectionURL);

module.exports = client;


