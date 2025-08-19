import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import songRouter from './songs/infraestructure/SongController';

const app = express();
const servicePort = process.env.SERVICE_PORT;
const clientPort = process.env.CLIENT_PORT;

app.use(
  cors({
    origin: `http://localhost:${clientPort}`,
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Service API Ready' });
});

app.use('/songs', songRouter());

app.listen(servicePort, () => {
  console.log(`Service running on port ${servicePort}`);
});

export default app;
