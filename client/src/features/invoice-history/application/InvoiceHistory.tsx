import { Paper, Table, TableCell, TableHead, TableRow } from '@mui/material';

const InvoiceHistory = () => {
  return (
    <section aria-labelledby="invoice-history-heading">
      <h2 id="invoice-history-heading">Invoice History</h2>
      <Table aria-label="invoice-history-table" component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Song Name</TableCell>
            <TableCell>Progress</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </section>
  );
};

export default InvoiceHistory;
