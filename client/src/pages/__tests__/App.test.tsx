import { render, screen, within } from '@testing-library/react';
import { it, expect, beforeAll, afterAll, vi } from 'vitest';
import App from '../App';
import { mockedSongs } from './mocks';

beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockedSongs),
    })
  ) as any;
});

afterAll(() => {
  vi.restoreAllMocks();
});

it('matches snapshot', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});

it('should render the app title', () => {
  render(<App />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Song Invoice History Manager'
  );
});

it('should render a songs table with the correct title and headers', async () => {
  render(<App />);

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
  render(<App />);

  const songsSection = screen.getByRole('region', { name: /songs/i });
  const songsTable = await within(songsSection).findByRole('table', { name: /songs-table/i });
  const [, row1, row2] = await within(songsTable).findAllByRole('row');

  expect(within(row1).getByRole('cell', { name: '1' })).toBeInTheDocument();
  expect(within(row1).getByRole('cell', { name: 'Flowers' })).toBeInTheDocument();
  expect(within(row1).getByRole('cell', { name: 'Miley Cyrus' })).toBeInTheDocument();
  expect(within(row1).getByRole('button', { name: /issue invoice/i })).toBeInTheDocument();

  expect(within(row2).getByRole('cell', { name: '2' })).toBeInTheDocument();
  expect(within(row2).getByRole('cell', { name: 'Anti-Hero' })).toBeInTheDocument();
  expect(within(row2).getByRole('cell', { name: 'Taylor Swift' })).toBeInTheDocument();
  expect(within(row2).getByRole('button', { name: /issue invoice/i })).toBeInTheDocument();
});
