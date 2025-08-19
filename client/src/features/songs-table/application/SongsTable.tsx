import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetSongsQuery } from './hooks/songsApi';

const SongsTable = () => {
  const { data: songs, isLoading, isError } = useGetSongsQuery();

  return (
    <>
      <h2 id="songs-table-heading">Songs</h2>
      <section aria-labelledby="songs-table-heading">
        {isLoading && <CircularProgress aria-label="loading" />}
        {isError && <h3>Failed to fetch songs</h3>}
        {songs?.length === 0 && <h3>No songs available</h3>}
        {songs && songs.length > 0 && (
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
              {songs.map(({ id, name, author, progress }) => (
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
        )}
      </section>
    </>
  );
};

export default SongsTable;
