-- Deinitialize everything if it is setup
drop user if exists 'root';
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
        address1 varchar(80),
        address2 varchar(80),
        city varchar(50),
        state char(2),
        zipcode char(5) CHECK(zipcode IS NULL OR (zipcode REGEXP '^[0-9]{5}$')),
        PRIMARY KEY(client_username),
        FOREIGN KEY(client_username) REFERENCES users(username)
);
CREATE TABLE quote (
        client_username varchar(16) NOT NULL,
        date date NOT NULL,
        gallons integer NOT NULL CHECK(gallons > 0),
        price  decimal(10,2) NOT NULL,
        due decimal(10,2) NOT NULL,
        address varchar(160) NOT NULL,
        city varchar(50) NOT NULL,
        state  char(2) NOT NULL,
        zipcode  char(5) NOT NULL CHECK(zipcode REGEXP '^[0-9]{5}$' ),
        FOREIGN KEY(client_username) REFERENCES users(username)
);
create table sessions (
		username varchar(16) not null,
        token varchar(512) not null,
        primary key(username, token),
        foreign key(username) references users(username)
);
commit;
-- Create a role 'root' and login for the backend to use on the database
create user 'root' identified by 'password';
-- Granting necessarily data-modification privileges to 'root'
grant insert, delete, select, update on cosc4353group21.* to 'root';
commit;
