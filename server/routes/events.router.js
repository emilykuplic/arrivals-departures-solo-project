var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var pool = require('../modules/pool.js');

//Get for all events to show up on the DOM
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

//get for invitation id on RSVP click
router.get('/invitation/:id', function(req, res){
  eventId= req.params.id;
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
        var queryText = 'SELECT "invitations"."id" FROM "invitations" JOIN "events" ON "events"."id" = "invitations"."event_id" JOIN "users"' +
        'ON "users"."id" = "invitations"."user_id" WHERE "users"."id" = $1 AND "events"."id"= $2;';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [req.user.id, eventId], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            // console.log(result);
            // Send back the results
            var data = {invitationId: result.rows};
            res.send(data);
          }
        }); // end query
      } else {
        res.sendStatus(401);
      }
    } // end if
  }); // end pool
}); // end of GET

router.put('/rsvp/:id', function(req, res){
  var eventToUpdate = req.params.id;
  console.log('Put route called to event of', eventToUpdate);
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.', req.body);
      res.sendStatus(500);
    } else {
      if(req.isAuthenticated()) {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'UPDATE FROM "invitations"  SET "arrival_date", "departure_date", "number_attending" WHERE "users"."id" = $1 AND "event"."id" = $2;';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [eventToUpdate, req.user.id, req.event.id], function(errorMakingQuery, result){
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
