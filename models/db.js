var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/rallydb';

module.exports = {
   query: function(text, values) {
      pg.connect(connectionString, function(err, client, done) {
        client.query(text, values, function(err, result) {
          console.log("done with 1");
          done();
        })
      });
   },

   querycb: function(text, values, cb) {
      pg.connect(connectionString, function(err, client, done) {
        client.query(text, values, function(err, result) {
          done();
          cb(err, result);
        })
      });
   },

   end: function() {
    pg.end();
   }
}