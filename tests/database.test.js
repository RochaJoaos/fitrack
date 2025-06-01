// database.test.js
const { searchUser } = require('../database');
const mongoose = require('mongoose');

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: { readyState: 0 },
  model: jest.fn(() => ({
    findOne: jest.fn().mockResolvedValue({ email: 'x', password: 'y' })
  })),
  Schema: class {}
}));

describe('searchUser()', () => {
  it('deve buscar usuário com email e senha corretos', async () => {
    const user = await searchUser({ email: 'x', password: 'y' });
    expect(user).toEqual({ email: 'x', password: 'y' });
  });
});
