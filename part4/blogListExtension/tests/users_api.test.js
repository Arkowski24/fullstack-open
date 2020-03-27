const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');
const listHelper = require('../utils/list_helper');

describe('created users', () => {
  test('are created correctly', async () => {
    const oldLength = (await User.find({})).length;

    const newUser = {
      username: 'ExampleUsername',
      name: 'Example Name',
      password: '4321',
    };

    const response = await api
      .post('/api/users/')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newLength = (await User.find({})).length;
    expect(newLength).toBe(oldLength + 1);

    const user = response.body;
    expect(user.id).toBeDefined();
    expect({
      username: user.username, name: user.name,
    }).toEqual({
      username: newUser.username, name: newUser.name,
    });
  });

  test('password has minimal length', async () => {
    const newUser = {
      username: 'Username2',
      name: 'Name2',
      password: '32',
    };

    await api
      .post('/api/users/')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect(400);
  });

  test('username is unique', async () => {
    const newUser = {
      username: 'Username1',
      name: 'Name1',
      password: '4321',
    };

    await api
      .post('/api/users/')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect(400);
  });
});

beforeEach(async () => {
  await User.deleteMany({});

  const usersPromises = listHelper.initalUsers
    .map((u) => User(u))
    .map((user) => user.save());

  await Promise.all(usersPromises);
});

afterAll(() => {
  mongoose.connection.close();
});
