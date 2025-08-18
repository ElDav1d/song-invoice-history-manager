import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Service API Ready' });
});

app.listen(port, () => {
  console.log(`Service running on port ${port}`);
});

export default app;
