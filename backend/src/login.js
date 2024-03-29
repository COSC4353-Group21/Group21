// Login module skeleton
const jwt = require('jsonwebtoken');
const { knexClient } = require('./knexClient');

// TODO make this crypto secure!
const token_secret = 'secrettoken';

const username_validate = (username) => {
    // Validate the the username does not include any illegal characters and is the required length
    return username.match(/^[a-zA-z0-9]{3,}$/)
};

const password_validate = (password) => {
    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
};

const is_valid = async (username, password) => {
    return knexClient.select('password').where('username', '=', username).from('users')
        .then((rows) => {
            if (rows.length !== 1) {
                return false;
            }
            const db_hash = rows[0]['password'];
            const passed_hash = SHA256(password).toString(Base64);
            if (db_hash !== passed_hash) {
                return false;
            }
            return true;
        });
}

const username_exists = async (username) => {
    return knexClient.select('username').where('username', '=', username).from('users')
        .then((rows) => { return rows.length > 0 });
}

const useradd = async (username, password) => {
    return knexClient('users').insert({username, password: SHA256(password).toString(Base64)}).then((_) => { 
    }).catch((e) => { throw e });
}

const make_invalid = async (username, token) => {
    knexClient('sessions').insert({username, token})
        .catch((e) => {throw e});
}

const token_is_invalid = async (token) => {
    if (!token) {
        return false;
    }
    const rows = await knexClient('sessions').select().where('token', '=', token)
    if (rows.length !== 0) {
        return true;
    }
    return false;
}

// TODO need to add input validation
const generate_token = async (username, password) => {
    // Validate that the username and password are in agreement
    // TODO implement a database lookup to do this
    //const is_valid = users.get(username) === password;
    //if (!is_valid) {
    const valid_user = await is_valid(username, password);
    if (!valid_user) {
        throw new Error('Invalid user or password');
    }
    const token = jwt.sign({ username: username}, token_secret, { expiresIn: 1800 });
    return token;
};

const validate_token = async (username, token) => {
    if (await token_is_invalid(token)) {
        return false;
    }
    try {
        const payload = jwt.verify(token, token_secret, { expiresIn: 1800 });
        return username === payload.username;
    }
    catch (e) {
        return false;
    }
};

const invalidate_token = async (username, token) => {
    try {
        const payload = jwt.verify(token, token_secret, { expiresIn: 1800 });
        if (username !== payload.username) {
            throw Error('Cannot invalidate an invalid token!');
        }
        if (await token_is_invalid(token)) {
            throw Error('Cannot invalidate an invalid token!');
        }
        await make_invalid(username, token);
        return true;
    } catch (e) {
        throw Error('Cannot invalidate an invalid token!');
    }
};

const create_user = async (username, password) => {
    if (await username_exists(username)) {
        throw Error('User already exists');
    } else if (!username_validate(username)) {
        throw Error('Username contains illegal characters or is the wrong length');
    } else if (!password_validate(password)) {
        throw Error('Password contains illegal characters or is not the correct length');
    }
    try {
        await useradd(username, password)
    } catch (e) {
        console.log(e);
        throw e;
    }
    return true;
}

module.exports = { generate_token, validate_token, invalidate_token, create_user };