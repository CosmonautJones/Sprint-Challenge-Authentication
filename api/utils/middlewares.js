const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModels');
const { mysecret } = require('../../config');
const SaltRounds = 11;

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      console.log('authentication fired');
      next();
    });
  } else {
    console.log('error authenticating')
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
};

const encryptUserPW = (req, res, next) => {
  const { username, password } = req.body;
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password encrypting, bcrypt.hash()
  if (!password) {
    sendUserError('I need a password to work with', res);
    return;
  }
  bcrypt
    .hash(password, SaltRounds)
    .then((pw) => {
      req.password = pw;
      const newUser = new User({ username, password: pw });
      req.user = newUser;
      console.log(`hashing success! hashed password: ${pw}`)
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
  // Once the password is encrypted using bcrypt, you'll need to save the user the DB.
  // Once the user is set, take the savedUser and set the returned document from Mongo on 'req.user'
  // call next to head back into the route handler for encryptUserPW
};

const compareUserPW = (req, res, next) => {
  const { username, password } = req.body;
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password comparing, bcrypt.compare()
  if (!username) {
    res.json({ error: 'must supply a user name' })
  }
  User.findOne({ username }, (err, user) => {
    if (err || user === null) {
      res.status(422)
      res.json({ err: 'Cannot find such user' });
      return;
    }
    const hashedPw = user.password;
    console.log(`hashing success! hashed password: ${hashedPw}`)
    bcrypt
      .compare(password, hashedPw)
      .then((response) => {
        if (!response) throw new Error();
        else {
          console.log('login: success!')
        }
        req.username = user.username;
        next();
      })
      .catch((error) => {
        res.status(422)
        res.json({ err: 'Incorrect Password' });
      });
  });
  // You'll need to find the user in your DB
  // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
  // If the passwords match set the username on `req` ==> req.username = user.username; and call next();
};

module.exports = {
  authenticate,
  encryptUserPW,
  compareUserPW
};
