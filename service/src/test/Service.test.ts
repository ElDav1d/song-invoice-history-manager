import { expect } from 'chai';
import request from 'supertest';
import express from 'express';

const app = express();
app.get('/', (req, res) => {
  res.json({ message: 'Service API Ready' });
});

it('should return API ready message', async () => {
  const response = await request(app).get('/').expect(200);

  expect(response.body).to.deep.equal({ message: 'Service API Ready' });
});
