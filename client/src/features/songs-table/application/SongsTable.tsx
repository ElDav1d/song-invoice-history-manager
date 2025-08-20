import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { useGetSongsQuery } from '@/features/songs-table/application/hooks/songsApi';
import { useSongsActions } from '@/features/songs-table/application/hooks/useSongsActions';
import { useEffect } from 'react';
import { useAppSelector } from '@/shared/application/hooks';
import { SongsTableStatus } from '@/features/songs-table/application/components';

const SongsTable = () => {
  const { data: fetchedSongs, isLoading, isError } = useGetSongsQuery();
  const { issueInvoice, addSongs } = useSongsActions();
  const { songs: sonsgsState } = useAppSelector((state) => state.songs);

  const hasIssuedInvoices = sonsgsState?.some(
    (song) => song.lastClickDate && song.lastClickProgress !== undefined
  );

  useEffect(() => {
    if (sonsgsState.length === 0 && fetchedSongs) {
      addSongs(fetchedSongs);
    }
  }, [sonsgsState, addSongs]);

  const handleIssueInvoice = (id: string, progressAtIssue: number) => {
    issueInvoice({ id, progressAtIssue });
  };

  return (
    <>
      <h2 id="songs-table-heading">Songs</h2>
      <section aria-labelledby="songs-table-heading">
        <SongsTableStatus
          isLoading={isLoading}
          isError={isError}
          isEmpty={!isLoading && !isError && sonsgsState?.length === 0}
        />
        {sonsgsState && sonsgsState.length > 0 && !isLoading && !isError && (
          <Table aria-label="songs-table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Song name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell aria-label="invoice-button-placeholder"></TableCell>
                {hasIssuedInvoices && (
                  <>
                    <TableCell>Last Invoice Issue</TableCell>
                    <TableCell>Last Issue Date</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sonsgsState.map(({ id, name, author, progress }) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{author}</TableCell>
                  <TableCell>{progress}</TableCell>
                  <TableCell>
                    <button onClick={() => handleIssueInvoice(id, progress)}>Issue Invoice</button>
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
