CREATE TABLE users (
    id serial PRIMARY KEY,
    username character varying(35),
    email character varying(45),
    password character varying,
    first_name character varying(35),
    last_name character varying(35),
    role integer
);

CREATE TABLE events (
    id serial PRIMARY KEY,
    event_name character varying(50),
    event_description character varying(500),
    starting_date date,
    ending_date date,
);

CREATE TABLE invitations (
    id serial PRIMARY KEY,
    event_id integer,
    user_id integer,
    arrival_date date,
    departure_date date,
    number_attending integer,
    FOREIGN KEY (event_id) REFERENCES events,
    FOREIGN KEY (user_id) REFERENCES users
);

Test Data
INSERT INTO "events" (event_name, event_description, starting_date, ending_date) VALUES
('Forth of July', 'Calling all Kuplics - it is firework time!', '06-29-2017', '07-09-2017');

INSERT INTO "invitations" (event_id, user_id, arrival_date, departure_date, number_attending) VALUES
(1, 1, '06-30-2017', '07-4-2017', 2);

Query
GET for events
SELECT "events"."event_name", "events"."event_description", "events"."starting_date","events"."ending_date"
FROM "events" JOIN "invitations" ON "events"."id" = "invitations"."event_id"
JOIN "users" ON "users"."id" = "invitations"."user_id" WHERE "users"."id" = 1 ;
