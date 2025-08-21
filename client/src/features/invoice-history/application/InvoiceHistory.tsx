import { useAppSelector } from '@/shared/application/hooks';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { TableRowCustom, TableCellCustom } from '@/shared/application/ui';

const InvoiceHistory = () => {
  const { issuedInvoices } = useAppSelector((state) => state.issuedInvoices);

  // TODO: move to domain object

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const formatProgress = (progress: number) => {
    return `${Math.round(progress * 100)}%`;
  };

  return (
    <section aria-labelledby="invoice-history-heading">
      <Typography component="h2" variant="h4" sx={{ my: 2 }} id="invoice-history-heading">
        Invoice History
      </Typography>

      {issuedInvoices.length > 0 ? (
        <Paper sx={{ overflowX: 'auto', p: 2 }}>
          <Table aria-label="invoice-history-table">
            <TableHead>
              <TableRow>
                <TableCell size="small">Date</TableCell>
                <TableCell size="small">Author</TableCell>
                <TableCell size="small">Song Name</TableCell>
                <TableCell size="small">Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issuedInvoices.map(({ id, date, author, songName, progress }, idx) => (
                <TableRowCustom key={id} isLast={idx === issuedInvoices.length - 1}>
                  <TableCell size="small">{formatDate(date)}</TableCell>
                  <TableCellCustom size="small" truncateOnMobile>
                    {author}
                  </TableCellCustom>
                  <TableCellCustom size="small" truncateOnMobile>
                    {songName}
                  </TableCellCustom>
                  <TableCell size="small">{formatProgress(progress)}</TableCell>
                </TableRowCustom>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <h3>No Issued Invoices</h3>
      )}
    </section>
  );
};

export default InvoiceHistory;
