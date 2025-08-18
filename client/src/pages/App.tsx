import { SongsTable } from '@/songs-table';
// Since there's no need for routing then App is considered as a page for outside-in testing purposes
const App = () => {
  return (
    <>
      <header>
        <h1>Song Invoice History Manager</h1>
      </header>
      <main>
        <SongsTable />
      </main>
    </>
  );
};

export default App;
