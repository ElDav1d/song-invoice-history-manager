import express from 'express';
import songRouter from './songs/infraestructure/SongController';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Service API Ready' });
});

app.listen(port, () => {
  console.log(`Service running on port ${port}`);
});

app.use('/songs', songRouter());

export default app;
