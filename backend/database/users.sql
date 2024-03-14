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
commit;
-- Create a role 'app' and login for the backend to use on the database
create user 'app' identified by 'test_password';
-- Granting necessarily data-modification privileges to 'app'
grant insert, delete, select, update on cosc4353group21.* to 'app';
commit;