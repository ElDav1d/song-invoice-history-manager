import { Table, TableHead, TableRow, TableCell, TableBody, Button, Paper } from '@mui/material';

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

  const formatProgress = (progress: number | undefined) => {
    if (progress === undefined) return 'N/A';
    return `${Math.round(progress * 100)}%`;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <section aria-labelledby="songs-table-heading">
      <h2 id="songs-table-heading">Songs</h2>
      <SongsTableStatus
        isLoading={isLoading}
        isError={isError}
        isEmpty={!isLoading && !isError && sonsgsState?.length === 0}
      />
      {sonsgsState && sonsgsState.length > 0 && !isLoading && !isError && (
        <Table aria-label="songs-table" component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Song Name</TableCell>
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
            {sonsgsState.map(({ id, name, author, progress, lastClickProgress, lastClickDate }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{author}</TableCell>
                <TableCell>{formatProgress(progress)}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleIssueInvoice(id, progress)}>
                    Issue Invoice
                  </Button>
                </TableCell>
                {hasIssuedInvoices && (
                  <>
                    <TableCell>{formatProgress(lastClickProgress)}</TableCell>
                    <TableCell>{formatDate(lastClickDate)}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

export default SongsTable;
