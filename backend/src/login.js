// Login module skeleton
const { initializeQuoteHistory } = require("./fuelquotes");
const jwt = require("jsonwebtoken");
const SHA256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");
const { knexClient } = require("./knexClient");

const token_secret = "secrettoken";

const username_validate = (username) => {
  // Validate the the username does not include any illegal characters and is the required length
  return username.match(/^[a-zA-z0-9]{3,}$/);
};

const password_validate = (password) => {
  return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
};

const is_valid = async (username, password) => {
  return knexClient
    .select("password")
    .where("username", "=", username)
    .from("users")
    .then((rows) => {
      if (rows.length !== 1) {
        return false;
      }
      const db_hash = rows[0]["password"];
      const passed_hash = SHA256(password).toString(Base64);
      if (db_hash !== passed_hash) {
        return false;
      }
      return true;
    });
};

const username_exists = async (username) => {
  // get username
  return knexClient
    .select("username")
    .where("username", "=", username)
    .from("users")
    .then((rows) => {
      return rows.length > 0;
    });
};

const useradd = async (username, password) => {
  // add user
  return knexClient("users")
    .insert({ username, password: SHA256(password).toString(Base64) })
    .then((_) => {})
    .catch((e) => {
      throw e;
    });
};

const make_invalid = async (username, token) => {
  knexClient("sessions")
    .insert({ username, token })
    .catch((e) => {
      throw e;
    });
};

const token_is_invalid = async (token) => {
  if (!token) {
    return false;
  }
  const rows = await knexClient("sessions").select().where("token", "=", token);
  if (rows.length !== 0) {
    return true;
  }
  return false;
};

const generate_token = async (username, password) => {
  // validate username and password
  const valid_user = await is_valid(username, password);
  if (!valid_user) {
    throw new Error("Invalid user or password");
  }
  const token = jwt.sign({ username: username }, token_secret, {
    expiresIn: 30 * 60 * 1000,
  });
  return token;
};

const validate_token = async (username, token) => {
  // validate token
  if (await token_is_invalid(token)) {
    return false;
  }
  try {
    const payload = jwt.verify(token, token_secret, {
      expiresIn: 30 * 60 * 1000,
    });
    return username === payload.username;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const invalidate_token = async (username, token) => {
  // invalidate token
  try {
    const payload = jwt.verify(token, token_secret, {
      expiresIn: 30 * 60 * 1000,
    });
    if (username !== payload.username) {
      throw Error("Cannot invalidate an invalid token!");
    }
    if (await token_is_invalid(token)) {
      throw Error("Cannot invalidate an invalid token!");
    }
    await make_invalid(username, token);
    return true;
  } catch (e) {
    throw Error("Cannot invalidate an invalid token!");
  }
};

const create_user = async (username, password) => {
  // user creation
  if (await username_exists(username)) {
    throw Error("User already exists");
  } else if (!username_validate(username)) {
    throw Error("Username contains illegal characters or is the wrong length");
  } else if (!password_validate(password)) {
    throw Error(
      "Password contains illegal characters or is not the correct length"
    );
  }
  try {
    await useradd(username, password);
  } catch (e) {
    console.log(e);
    throw e;
  }
  return true;
};

module.exports = {
  generate_token,
  validate_token,
  invalidate_token,
  create_user,
};
