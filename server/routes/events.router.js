var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var pool = require('../modules/pool.js');


router.get('/', function(req, res){
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      if(req.isAuthenticated()) {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'SELECT * FROM "events" JOIN "invitations" ON "events"."id" = "invitations"."event_id" JOIN "users"' +
        'ON "users"."id" = "invitations"."user_id" WHERE "users"."id" = $1;';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [req.user.id], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            // console.log(result);
            // Send back the results
            var data = {events: result.rows};
            res.send(data);
          }
        }); // end query
      } else {
        res.sendStatus(401);
      }
    } // end if
  }); // end pool
}); // end of GET

module.exports = router;
