import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Song } from '@/features/songs-table/entities/Song';
import { useState, useEffect } from 'react';

const SongsTable = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/songs`);

      if (!response.ok) {
        console.error('Failed to fetch songs');
        return;
      }

      const data = await response.json();

      setSongs(data);
    };
    fetchSongs();
  }, []);

  return (
    <>
      <h2 id="songs-table-heading">Songs</h2>
      <section aria-labelledby="songs-table-heading">
        <Table aria-label="songs-table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Song name</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell aria-label="invoice-button-placeholder"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.length > 0 &&
              songs.map(({ id, name, author, progress }) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{author}</TableCell>
                  <TableCell>{progress}</TableCell>
                  <TableCell>
                    <button>Issue Invoice</button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default SongsTable;
