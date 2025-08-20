import { Paper, Table, TableCell, TableHead, TableRow } from '@mui/material';

const InvoiceHistory = () => {
  return (
    <section aria-labelledby="invoice-history-heading">
      <h2 id="invoice-history-heading">Invoice History</h2>
      <Table aria-label="invoice-history-table" component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell size="small">Date</TableCell>
            <TableCell size="small">Author</TableCell>
            <TableCell size="small">Song Name</TableCell>
            <TableCell size="small">Progress</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </section>
  );
};

export default InvoiceHistory;
