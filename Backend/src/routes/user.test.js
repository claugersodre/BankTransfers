const request = require('supertest');
const express = require('express');
const router = require('./user'); 

// Mock the models
jest.mock('../models/user', () => ({
  create: jest.fn(),
  findAll: jest.fn()
}));

jest.mock('../models/account', () => ({
  findAll: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/users', router);

describe('User API', () => {
  test('POST /users', async () => {
    const userData = { name: 'testuser', password: 'testpassword' };
    const user = { id: 1, ...userData }; // Mocked user data

    // Mock the User.create method
    require('../models/user').create.mockResolvedValue(user);

    const res = await request(app)
      .post('/users')
      .send(userData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(user);
  });

  test('GET /users', async () => {
    const users = [{ id: 1, name: 'user1', password: 'pass1' }, { id: 2, name: 'user2', password: 'pass2' }];

    // Mock the User.findAll method
    require('../models/user').findAll.mockResolvedValue(users);

    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(users);
  });

  test('GET /users/useraccount', async () => {
    const usersWithAccounts = [
      { id: 1, name: 'user1', password: 'pass1', Accounts: [{ id: 1, type: 'savings', amount: 100 }] },
      { id: 2, name: 'user2', password: 'pass2', Accounts: [{ id: 2, type: 'checking', amount: 200 }] }
    ];

    // Mock the User.findAll method with include option
    require('../models/user').findAll.mockResolvedValue(usersWithAccounts);

    const res = await request(app).get('/users/useraccount');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(usersWithAccounts);
  });
});
