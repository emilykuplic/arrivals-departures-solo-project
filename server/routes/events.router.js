var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var pool = require('../modules/pool.js');
var ADMIN = 1;
var USER = 2;

//Get for all events for that user to show up on the DOM
router.get('/', function(req, res){
  if(req.isAuthenticated()) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        //method that passport puts on the req object returns T or F
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

      } // end else
    }); // end pool
  } else {
    res.sendStatus(401);
  }
}); // end of GET

//Get for all events for admin
router.get('/admin', function(req, res){
  if(req.isAuthenticated() && req.user.role === ADMIN) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        //method that passport puts on the req object returns T or F
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
      } // end else
    }); // end pool
  } //end if
  else {
    res.sendStatus(401);
  }
}); // end of GET - admin all events

//Get for user information for inviting to events
router.get('/create', function(req, res){
  if(req.isAuthenticated() && req.user.role === ADMIN){
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        //method that passport puts on the req object returns T or F
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'SELECT "id","first_name", "last_name", "email" FROM "users"';
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
      } // end else
    }); // end pool
  } //end if
  else {
    res.sendStatus(401);
  }
}); // end of GET - users information for inviting

//Get for all users invited to event to display to  DOM
router.get('/attending/:id', function(req, res){
  var selectedEvent = req.params.id;
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
        var queryText = 'SELECT * FROM "users" JOIN "invitations" ' +
        'ON "users"."id" = "invitations"."user_id" JOIN "events"' +
        'ON "invitations"."event_id" = "events"."id" WHERE "event_id" = $1;';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [selectedEvent], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            console.log('result of ted things', result.rows);
            // Send back the results

            res.send(result.rows);
          }
        }); // end query
      } else {
        res.sendStatus(401);
      }
    } // end if
  }); // end pool
}); // end of GET

//Get for all users attending event to display to  DOM
router.get('/invite/:id', function(req, res){
  var selectedEvent = req.params.id;
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
        var queryText = 'SELECT * FROM "users" JOIN "invitations" ' +
        'ON "users"."id" = "invitations"."user_id" JOIN "events"' +
        'ON "invitations"."event_id" = "events"."id" WHERE "event_id" = $1;';
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
            var data = {invitedPeople: result.rows};
            res.send(data);
          }
        }); // end query
      } else {
        res.sendStatus(401);
      }
    } // end if
  }); // end pool
}); // end of GET

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
        var queryText = 'UPDATE "invitations" SET "arrival_date" = $1, "departure_date" =$2, "number_attending" =$3 ' +
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
    var details = req.body;
    console.log('Put route called to event of', details);
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.', selectedEvent);
        res.sendStatus(500);
      } else {
        if(req.isAuthenticated()) {
          // We connected to the database!!!
          // Now we're going to GET things from the db
          var queryText = 'UPDATE "events" SET "event_name"=$1, "event_description"=$2, ' +
          '"starting_date"=$3, "ending_date"=$4 WHERE "id"= $5' ;
          // errorMakingQuery is a bool, result is an object
          db.query(queryText,[details.selectedEvent.event_name, details.selectedEvent.event_description, details.selectedEvent.starting_date,
            details.selectedEvent.ending_date, details.selectedEvent.id], function(errorMakingQuery, result){
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

    // Create a new event - Admin
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

      // Create a invite user to event - Admin
      router.post('/invite/', function(req, res){
        var info = req.body;
        console.log('Post route called to event of', info);
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
              var queryText = 'INSERT INTO "invitations" ("event_id", "user_id")' +
              ' VALUES ($1, $2);';
              // errorMakingQuery is a bool, result is an object
              db.query(queryText,[info.event_id, info.id], function(errorMakingQuery, result){
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
      }); // end of POST - invite user to event - admin

      // delete route to delect selectedEvent -- Admin
      router.delete('/edit/:id', function(req, res){
        var selectedEvent = req.params.id;
        console.log('Delete route called to this id', selectedEvent);
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


      });//end of router function

      module.exports = router;
