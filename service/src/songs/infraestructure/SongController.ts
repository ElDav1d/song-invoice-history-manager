import { Router } from 'express';
import { getAllSongs as defaultGetAllSongs } from '../application/GetAllSongs';

// allow dependency injection for testing
export default function songRouter(getAllSongs = defaultGetAllSongs) {
  const router = Router();

  router.get('/', (req, res) => {
    try {
      const songs = getAllSongs();

      if (!songs || songs.length === 0) {
        return res.status(404).json({ error: 'No songs found' });
      }

      res.json(songs);
    } catch (error) {
      console.error('Error fetching songs:', error);

      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
