const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('/', async (request, response) => {
  const { body } = request;

  const user = await User.findOne({ username: body.username });
  const passwordCorrect = user === null
    ? false : await bcrypt.compare(body.password, user.passwordHash);

  if (!passwordCorrect) {
    return response.status(400).json({
      error: 'Invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  };
  const token = jwt.sign(userForToken, config.SECRET);

  return response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
