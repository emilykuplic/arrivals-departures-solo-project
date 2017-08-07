CREATE TABLE users (
    id serial PRIMARY KEY,
    username character varying(35),
    email character varying(45),
    password character varying,
    first_name character varying(35),
    last_name character varying(35),
    role integer
);
