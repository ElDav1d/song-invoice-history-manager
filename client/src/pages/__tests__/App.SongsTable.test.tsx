import { screen, waitFor, within } from '@testing-library/react';
import { it, expect, beforeEach, vi } from 'vitest';
import { renderApp, mockQueryStates } from './setup';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  vi.restoreAllMocks();
});

it('should render a loading state when fetching songs', () => {
  mockQueryStates.loading();

  renderApp();

  const loader = screen.getByRole('progressbar', { name: /loading/i });
  expect(loader).toBeInTheDocument();
});

it('should render an error message when fetching songs fails', async () => {
  mockQueryStates.error();

  renderApp();

  const errorMessage = await screen.findByRole('heading', { level: 3 });
  expect(errorMessage).toHaveTextContent(/failed to fetch songs/i);
});

it('should render a message when no songs are available', async () => {
  mockQueryStates.empty();

  renderApp();

  const noSongsMessage = await screen.findByRole('heading', { name: /no songs available/i });
  expect(noSongsMessage).toBeInTheDocument();
});

it('should render a songs table with the correct title and headers', async () => {
  mockQueryStates.withNewData();

  renderApp();

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
  mockQueryStates.withNewData();

  renderApp();

  const songsSection = screen.getByRole('region', { name: /songs/i });
  const songsTable = await within(songsSection).findByRole('table', { name: /songs-table/i });
  const rows = await within(songsTable).findAllByRole('row');

  // Check number of rows (1 header + 2 data rows)
  expect(rows.length).toBeGreaterThanOrEqual(3);

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

it('should render two new columns after issue an invoice', async () => {
  const user = userEvent.setup();
  mockQueryStates.withNewData();

  renderApp();

  const songsSection = screen.getByRole('region', { name: /songs/i });
  const songsTable = await within(songsSection).findByRole('table', { name: /songs-table/i });

  const issueInvoiceButtons = within(songsTable).getAllByRole('button', { name: /issue invoice/i });
  const firstIssueButton = issueInvoiceButtons[0];

  await user.click(firstIssueButton);

  await waitFor(() => {
    expect(
      within(songsTable).getByRole('columnheader', { name: /last invoice issue/i })
    ).toBeInTheDocument();
    expect(
      within(songsTable).getByRole('columnheader', { name: /last issue date/i })
    ).toBeInTheDocument();
  });
});
