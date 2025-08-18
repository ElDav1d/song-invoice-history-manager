import { expect } from 'chai';
import request from 'supertest';
import app from '../index'; // Import your real app

it('should return API ready message', async () => {
  const response = await request(app).get('/').expect(200);
  expect(response.body).to.deep.equal({ message: 'Service API Ready' });
});

it('should return an array of songs', async () => {
  const response = await request(app).get('/songs').expect(200);
  expect(response.body).to.be.an('array');
});
