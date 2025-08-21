import { InvoiceHistory } from '@/features/invoice-history';
import { SongsTable } from '@/features/songs-table';
import { Container, Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Since there's no need for routing then App is considered as a page for outside-in testing purposes
const App = () => {
  return (
    <>
      <Container maxWidth="lg" component="header">
        <Typography component="h1" variant="h3" sx={{ my: 4 }}>
          Song Invoice History Manager
        </Typography>
      </Container>
      <Container maxWidth="lg" component="main">
        <SongsTable />
        <InvoiceHistory />
      </Container>
    </>
  );
};

export default App;
