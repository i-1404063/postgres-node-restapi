CREATE DATABASE todo_database;

--\c database_name into todo_database

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

--\dt to see all the table in the database