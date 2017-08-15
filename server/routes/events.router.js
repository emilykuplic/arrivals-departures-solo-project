var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var pool = require('../modules/pool.js');

//Get for all events for that user to show up on the DOM
router.get('/', function(req, res){
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      //method that passport puts on the req object returns T or F
      if(req.isAuthenticated()) {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'SELECT * FROM "events" JOIN "invitations" ' +
        'ON "events"."id" = "invitations"."event_id" JOIN "users"' +
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

//Get for all events for admin
router.get('/admin', function(req, res){
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      //method that passport puts on the req object returns T or F
      if(req.isAuthenticated()) {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'SELECT * FROM "events"';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, function(errorMakingQuery, result){
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
}); // end of GET - admin all events

//Get for user inforation
router.get('/create', function(req, res){
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      //method that passport puts on the req object returns T or F
      if(req.isAuthenticated()) {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'SELECT "first_name", "last_name", "email" FROM "users"';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            // console.log(result);
            // Send back the results
            var data = {users: result.rows};
            res.send(data);
          }
        }); // end query
      } else {
        res.sendStatus(401);
      }
    } // end if
  }); // end pool
}); // end of GET - users information for inviting


router.put('/rsvp/', function(req, res){
  var event = req.body;
  console.log('Put route called to event of', event);
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
        var queryText = 'UPDATE "invitations"  SET "arrival_date" = $1, "departure_date" =$2, "number_attending" =$3 ' +
        'WHERE "user_id" = $4 AND "event_id" = $5;';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText,[event.selectedEvent.arrival_date, event.selectedEvent.departure_date, event.selectedEvent.number_attending,
          event.selectedEvent.user_id, event.selectedEvent.event_id], function(errorMakingQuery, result){
            done();
            if(errorMakingQuery) {
              console.log('Attempted to query with', queryText);
              console.log('Error making query', errorMakingQuery);
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
  }); // end of PUT rsvp - user

  router.put('/edit/', function(req, res){
    var ev = req.body;
    console.log('Put route called to event of', ev);
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
          var queryText = 'INSERT INTO "events"  SET "event_name"=$1, "event_description"=$2, "starting_date"=$3, "ending_date"=$4,';
          // errorMakingQuery is a bool, result is an object
          db.query(queryText,[ev.selectedEvent.event_name, ev.selectedEvent.event_description, ev.selectedEvent.starting_date,
            ev.selectedEvent.ending_date], function(errorMakingQuery, result){
              done();
              if(errorMakingQuery) {
                console.log('Attempted to query with', queryText);
                console.log('Error making query', errorMakingQuery);
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
    }); // end of PUT - edit event admin

    router.post('/create/', function(req, res){
      var ev = req.body;
      console.log('Post route called to event of', ev);
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
            var queryText = 'INSERT INTO "events" ("event_name", "event_description", "starting_date", "ending_date")' +
            ' VALUES ($1, $2, $3, $4);';
            // errorMakingQuery is a bool, result is an object
            db.query(queryText,[ev.event_name, ev.event_description, ev.starting_date,
              ev.ending_date], function(errorMakingQuery, result){
                done();
                if(errorMakingQuery) {
                  console.log('Attempted to query with', queryText);
                  console.log('Error making query', errorMakingQuery);
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
      }); // end of POST - create event admin

// delete route to delect selectedEvent -- Admin
      router.delete('/edit/:id', function(req, res){
      var selectedEvent = req.params.id;
        console.log('Delete route called to this', selectedEvent);
        // errorConnecting is bool, db is what we query against,
        // done is a function that we call when we're done
        pool.connect(function(errorConnectingToDatabase, db, done){
          if(errorConnectingToDatabase) {
            console.log('Error connecting to the database.');
            res.sendStatus(500);
          } else {
            // We connected to the database!!!
            // Now we're going to GET things from the db
            var queryText = 'DELETE FROM "events" WHERE "id" = $1;' ;
            // errorMakingQuery is a bool, result is an object
            db.query(queryText, [selectedEvent], function(errorMakingQuery, result){
              done();
              if(errorMakingQuery) {
                console.log('Attempted to query with', queryText);
                console.log('Error making query');
                res.sendStatus(500);
              } else {
                // console.log(result);
                // Send back the results
                res.sendStatus(200);
              }
            }); // end query
          } // end if
        }); // end of DELETE - admin event delete
      });

      module.exports = router;
