import { v4 as uuidv4 } from 'uuid';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import { useGetSongsQuery } from '@/features/songs-table/application/hooks/songsApi';
import { useSongsActions } from '@/features/songs-table/application/hooks/useSongsActions';
import { useEffect } from 'react';
import { useAppSelector } from '@/shared/application/hooks';
import { SongsTableStatus } from '@/features/songs-table/application/components';
import { useIssuedInvoiceActions } from '@/features/invoice-history/application/hooks/useIssuedInvoiceActions';
import { TableCellCustom, TableRowCustom } from '@/shared/application/ui';

const SongsTable = () => {
  const { data: fetchedSongs, isLoading, isError } = useGetSongsQuery();
  const { issueInvoice, addSongs } = useSongsActions();
  const { addIssuedInvoice } = useIssuedInvoiceActions();
  const { songs: songsState } = useAppSelector((state) => state.songs);

  const hasIssuedInvoices = songsState?.some(
    (song) => song.lastClickDate && song.lastClickProgress !== undefined
  );

  useEffect(() => {
    if (songsState.length === 0 && fetchedSongs) {
      addSongs(fetchedSongs);
    }
  }, [songsState, addSongs]);

  // TODO: move to domain object
  const handleIssueInvoice = (
    id: string,
    progressAtIssue: number,
    name: string,
    author: string
  ) => {
    const dateIssued = new Date().toISOString();

    issueInvoice({ id, progressAtIssue, dateIssued });

    addIssuedInvoice({
      id: uuidv4(),
      progress: progressAtIssue,
      date: dateIssued,
      songName: name,
      author,
    });
  };

  // TODO: move to domain object
  const formatProgress = (progress: number | undefined) => {
    if (progress === undefined) return 'N/A';
    return `${Math.round(progress * 100)}%`;
  };

  // TODO: move to domain
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <section aria-labelledby="songs-table-heading">
      <Typography component="h2" variant="h4" sx={{ my: 2 }} id="songs-table-heading">
        Songs
      </Typography>
      <SongsTableStatus
        isLoading={isLoading}
        isError={isError}
        isEmpty={!isLoading && !isError && songsState?.length === 0}
      />
      {songsState && songsState.length > 0 && !isLoading && !isError && (
        <Paper sx={{ overflowX: 'auto', p: 2 }}>
          <Table aria-label="songs-table">
            <TableHead>
              <TableRow>
                <TableCell size="small">ID</TableCell>
                <TableCell size="small">Song Name</TableCell>
                <TableCell size="small">Author</TableCell>
                <TableCell size="small">Progress</TableCell>
                <TableCell aria-label="invoice-button-placeholder"></TableCell>
                {hasIssuedInvoices && (
                  <>
                    <TableCell size="small">Last Invoice Issue</TableCell>
                    <TableCell size="small">Issuance Date</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {songsState.map(
                ({ id, name, author, progress, lastClickProgress, lastClickDate }, index) => (
                  <TableRowCustom key={id} isLast={index === songsState.length - 1}>
                    <TableCell size="small">{id}</TableCell>
                    <TableCellCustom size="small" truncateOnMobile>
                      {name}
                    </TableCellCustom>
                    <TableCellCustom size="small" truncateOnMobile>
                      {author}
                    </TableCellCustom>
                    <TableCell size="small">{formatProgress(progress)}</TableCell>
                    <TableCell size="small">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleIssueInvoice(id, progress, name, author)}
                      >
                        Issue Invoice
                      </Button>
                    </TableCell>
                    {hasIssuedInvoices && (
                      <>
                        <TableCell size="small">{formatProgress(lastClickProgress)}</TableCell>
                        <TableCell size="small">{formatDate(lastClickDate)}</TableCell>
                      </>
                    )}
                  </TableRowCustom>
                )
              )}
            </TableBody>
          </Table>
        </Paper>
      )}
    </section>
  );
};

export default SongsTable;
