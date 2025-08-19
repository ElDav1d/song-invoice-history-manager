import { render, screen, within } from '@testing-library/react';
import { it, expect, beforeEach, vi } from 'vitest';
import App from '../App';
import { mockedSongs } from './mocks';
import { Provider } from 'react-redux';
import { store } from '../../shared/store';
import { useGetSongsQuery } from '@/features/songs-table/services/songsApi';

vi.mock('@/features/songs-table/services/songsApi', () => ({
  default: {
    reducerPath: 'songsApi',
    reducer: (state = {}) => state,
    middleware: (_store: any) => (next: any) => (action: any) => next(action),
    util: {
      resetApiState: vi.fn(),
    },
  },
  useGetSongsQuery: vi.fn(),
}));

beforeEach(() => {
  vi.restoreAllMocks();
});

it('matches snapshot', () => {
  // Mock the useGetSongsQuery hook to return consistent data for snapshot
  vi.mocked(useGetSongsQuery).mockReturnValue({
    data: mockedSongs,
    isLoading: false,
    isError: false,
    error: undefined,
    refetch: vi.fn(),
  } as any);

  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});

it('should render the app title', () => {
  // Mock the useGetSongsQuery hook to return loading state
  vi.mocked(useGetSongsQuery).mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
    error: undefined,
    refetch: vi.fn(),
  } as any);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Song Invoice History Manager'
  );
});

it('should render a loading state when fetching songs', () => {
  // Mock the useGetSongsQuery hook to return loading state
  vi.mocked(useGetSongsQuery).mockReturnValue({
    data: undefined,
    isLoading: true,
    isError: false,
    error: undefined,
    refetch: vi.fn(),
  } as any);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const loader = screen.getByRole('progressbar', { name: /loading/i });
  expect(loader).toBeInTheDocument();
});

it('should render an error message when fetching songs fails', async () => {
  // Mock the useGetSongsQuery hook to return error state
  vi.mocked(useGetSongsQuery).mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: true,
    error: new Error('Failed to fetch'),
    refetch: vi.fn(),
  } as any);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const errorMessage = await screen.findByRole('heading', { level: 3 });
  expect(errorMessage).toHaveTextContent(/failed to fetch songs/i);
});

it('should render a message when no songs are available', async () => {
  // Mock the useGetSongsQuery hook to return empty array
  vi.mocked(useGetSongsQuery).mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    error: undefined,
    refetch: vi.fn(),
  } as any);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const noSongsMessage = await screen.findByRole('heading', { name: /no songs available/i });
  expect(noSongsMessage).toBeInTheDocument();
});

it('should render a songs table with the correct title and headers', async () => {
  // Mock the useGetSongsQuery hook to return songs data
  vi.mocked(useGetSongsQuery).mockReturnValue({
    data: mockedSongs,
    isLoading: false,
    isError: false,
    error: undefined,
    refetch: vi.fn(),
  } as any);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const songsSection = screen.getByRole('region', { name: /songs/i });
  const songsTable = await within(songsSection).findByRole('table', { name: /songs-table/i });

  expect(within(songsTable).getByRole('columnheader', { name: /id/i })).toBeInTheDocument();
  expect(within(songsTable).getByRole('columnheader', { name: /song name/i })).toBeInTheDocument();
  expect(within(songsTable).getByRole('columnheader', { name: /author/i })).toBeInTheDocument();
  expect(within(songsTable).getByRole('columnheader', { name: /progress/i })).toBeInTheDocument();
  expect(
    within(songsTable).getByRole('columnheader', { name: /invoice-button-placeholder/i })
  ).toBeInTheDocument();
});

it('should render songs rows with their data correctly', async () => {
  // Mock the useGetSongsQuery hook
  vi.mocked(useGetSongsQuery).mockReturnValue({
    data: mockedSongs,
    isLoading: false,
    isError: false,
    error: undefined,
    refetch: vi.fn(),
  } as any);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const songsSection = screen.getByRole('region', { name: /songs/i });
  const songsTable = await within(songsSection).findByRole('table', { name: /songs-table/i });
  const rows = await within(songsTable).findAllByRole('row');

  // Debug: check number of rows
  expect(rows.length).toBeGreaterThanOrEqual(3); // 1 header + 2 data rows

  // Skip the header row and get data rows
  const [, row1, row2] = rows;

  // Verify rows are not undefined
  expect(row1).toBeDefined();
  expect(row2).toBeDefined();

  expect(within(row1).getByText('1')).toBeInTheDocument();
  expect(within(row1).getByText('Flowers')).toBeInTheDocument();
  expect(within(row1).getByText('Miley Cyrus')).toBeInTheDocument();
  expect(within(row1).getByRole('button', { name: /issue invoice/i })).toBeInTheDocument();

  expect(within(row2).getByText('2')).toBeInTheDocument();
  expect(within(row2).getByText('Anti-Hero')).toBeInTheDocument();
  expect(within(row2).getByText('Taylor Swift')).toBeInTheDocument();
  expect(within(row2).getByRole('button', { name: /issue invoice/i })).toBeInTheDocument();
});
