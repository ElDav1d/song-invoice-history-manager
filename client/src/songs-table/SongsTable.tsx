import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

const SongsTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="songs">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Song name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{/* Render song rows here */}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default SongsTable;
