import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import songRouter from '../SongController';
import sinon from 'sinon';

const app = express();
app.use('/songs', songRouter());

it('GET /songs should return 200 and an array', async () => {
  const res = await request(app).get('/songs');

  expect(res.status).to.equal(200);
});

it('GET /songs should return an array of 10 songs', async () => {
  const res = await request(app).get('/songs');

  expect(res.status).to.equal(200);
  expect(res.body).to.be.an('array').that.has.lengthOf(10);
});

it('GET /songs should return 404 if no songs found', async () => {
  // Inject a mock that returns []
  const app404 = express();

  app404.use(
    '/songs',
    songRouter(() => [])
  );

  const res = await request(app404).get('/songs');

  expect(res.status).to.equal(404);
  expect(res.body).to.have.property('error', 'No songs found');
});

it('GET /songs should return 500 if getAllSongs throws', async () => {
  // Mock getAllSongs to throw an error
  const errorThrowingGetAllSongs = () => {
    throw new Error('Test error');
  };

  // Silence console.error in order to prevent test pollution
  const consoleErrorStub = sinon.stub(console, 'error');

  const app500 = express();
  app500.use('/songs', songRouter(errorThrowingGetAllSongs));

  const res = await request(app500).get('/songs');

  expect(res.status).to.equal(500);
  expect(res.body).to.have.property('error', 'Internal server error');

  consoleErrorStub.restore();
});
