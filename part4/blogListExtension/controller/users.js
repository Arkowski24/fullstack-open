const bcrypt = require('bcrypt');

const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  return response.status(200).json(users);
});

usersRouter.post('/', async (request, response) => {
  const { body } = request;

  if (!body.password || body.password.length < 3) { return response.status(400).json({ error: 'Password too short' }); }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const newUser = await user.save();
  return response.status(201).json(newUser);
});

module.exports = usersRouter;
