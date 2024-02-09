const request = require('supertest');
const express = require('express');
const router = require('../routes/account'); // Assuming your routes file is named accounts.js

// Mock the Account model
jest.mock('../models/account', () => ({
  create: jest.fn(),
  findByPk: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/accounts', router);

describe('Account API', () => {
  test('POST /accounts', async () => {
    const accountData = { type: 'savings', amount: 100, userId: 1 };
    const account = { id: 1, ...accountData }; // Mocked account data

    // Mock the Account.create method
    require('../models/account').create.mockResolvedValue(account);

    const res = await request(app)
      .post('/accounts')
      .send(accountData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(account);
  });


  test('POST /accounts/transfer - Invalid transfer (insufficient balance)', async () => {
    const fromAccountId = 1;
    const toAccountId = 2;
    const amount = 150; // Amount exceeds fromAccount balance

    // Mock the Account.findByPk method
    require('../models/account').findByPk.mockImplementation(id => {
      if (id === fromAccountId) return Promise.resolve({ id: fromAccountId, amount: 100 });
      if (id === toAccountId) return Promise.resolve({ id: toAccountId, amount: 200 });
      return Promise.resolve(null);
    });

    const res = await request(app)
      .post('/accounts/transfer')
      .send({ fromAccountId, toAccountId, amount });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid transfer' });
  });

  test('POST /accounts/transfer - Invalid transfer (account not found)', async () => {
    const fromAccountId = 1;
    const toAccountId = 2;
    const amount = 50;

    // Mock the Account.findByPk method
    require('../models/account').findByPk.mockResolvedValue(null);

    const res = await request(app)
      .post('/accounts/transfer')
      .send({ fromAccountId, toAccountId, amount });

    expect(res.statusCode).toBe(400); // Using 400 for simplicity, you might want to use a different status code
    expect(res.body).toEqual({ error: 'Invalid transfer' });
  });
});
