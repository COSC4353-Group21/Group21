-- Deinitialize everything if it is setup
drop user if exists 'app';
drop database if exists cosc4353group21;
commit;
-- Initialize the database
create database cosc4353group21;
use cosc4353group21;
-- Create our tables
CREATE TABLE users (
	username varchar(16) not null check(username regexp '^[a-zA-Z0-9]{3,}$'),
        password char(44) not null check(password regexp '^[a-zA-Z0-9+/=]{44}$'),
        primary key(username)
);
CREATE TABLE profile (
        client_username  varchar(16) NOT NULL CHECK(client_username REGEXP '^[a-zA-Z0-9]{3,}$'),
        full_name varchar(50),
        email varchar(50) NOT NULL CHECK(email REGEXP '^[[:alnum:]]+([\.-]?[[:alnum:]]+)*@\[[:alnum:]]+([\.-]?[[:alnum:]]+)*(\.[[:alnum:]]{2,3})+$'),
        address1 varchar(80),
        address2 varchar(80),
        city varchar(50),
        state char(2),
        zipcode char(5) CHECK(zipcode IS NULL OR (zipcode REGEXP '^[0-9]{5}$')),
        phone char(10) NOT NULL CHECK(phone REGEXP '[0-9]{10}'),
        PRIMARY KEY(client_username),
        FOREIGN KEY(client_username) REFERENCES users(username)
);
commit;
-- Create a role 'app' and login for the backend to use on the database
create user 'app' identified by 'test_password';
-- Granting necessarily data-modification privileges to 'app'
grant insert, delete, select, update on cosc4353group21.* to 'app';
commit;c
CREATE TABLE quote (
        client_username varchar(16) NOT NULL,
        date date NOT NULL,
        gallons integer NOT NULL CHECK(gallons > 0),