import { InvoiceHistory } from '@/features/invoice-history';
import { SongsTable } from '@/features/songs-table';
import { Container } from '@mui/material';

// Since there's no need for routing then App is considered as a page for outside-in testing purposes
const App = () => {
  return (
    <>
      <Container maxWidth="lg" component="header">
        <h1>Song Invoice History Manager</h1>
      </Container>
      <Container maxWidth="lg" component="main">
        <SongsTable />
        <InvoiceHistory />
      </Container>
    </>
  );
};

export default App;
