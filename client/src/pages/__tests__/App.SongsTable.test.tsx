import { screen, waitFor, within } from '@testing-library/react';
import { it, expect, beforeEach, vi } from 'vitest';
import { renderApp, mockQueryStates } from './setup';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

it('should render a loading state when fetching songs', () => {
  mockQueryStates.loading();

  renderApp();

  const loader = screen.getByRole('progressbar', { name: /loading songs/i });
  expect(loader).toBeInTheDocument();
});

it('should render an error message when fetching songs fails', async () => {
  mockQueryStates.error();

  renderApp();

  const errorMessage = await screen.findByRole('heading', {
    level: 3,
    name: /failed to fetch songs/i,
  });

  expect(errorMessage).toBeInTheDocument();
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
  const [, row1, row2] = rows;

  expect(within(row1).getByText('1')).toBeInTheDocument();
  expect(within(row1).getByText('Flowers')).toBeInTheDocument();
  expect(within(row1).getByText('Miley Cyrus')).toBeInTheDocument();
  expect(within(row1).getByText('15%')).toBeInTheDocument();
  expect(within(row1).getByRole('button', { name: /issue invoice/i })).toBeInTheDocument();

  expect(within(row2).getByText('2')).toBeInTheDocument();
  expect(within(row2).getByText('Anti-Hero')).toBeInTheDocument();
  expect(within(row2).getByText('Taylor Swift')).toBeInTheDocument();
  expect(within(row2).getByText('27%')).toBeInTheDocument();
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
      within(songsTable).getByRole('columnheader', { name: /issuance date/i })
    ).toBeInTheDocument();
  });
});

it('should render songs rows with last invoice issue and date after issuing an invoice', async () => {
  const user = userEvent.setup();
  mockQueryStates.withNewData();

  renderApp();

  const songsSection = screen.getByRole('region', { name: /songs/i });
  const songsTable = await within(songsSection).findByRole('table', { name: /songs-table/i });

  const rows = await within(songsTable).findAllByRole('row');
  const [, row1, row2] = rows;

  // Get initial progress from the first song (15% from mock data)
  const initialProgressElement = within(row1).getByText('15%');
  expect(initialProgressElement).toBeInTheDocument();

  const issueInvoiceButtons = within(songsTable).getAllByRole('button', { name: /issue invoice/i });
  const firstIssueButton = issueInvoiceButtons[0];

  await user.click(firstIssueButton);

  await waitFor(() => {
    expect(within(row1).getByText('1')).toBeInTheDocument();
    expect(within(row1).getByText('Flowers')).toBeInTheDocument();
    expect(within(row1).getByText('Miley Cyrus')).toBeInTheDocument();

    // Check that progress has increased from 15% to some higher value
    // We don't care about the exact increment, just that it increased
    const progressCells = within(row1).getAllByRole('cell');
    const currentProgressCell = progressCells[3]; // Progress column
    const currentProgressText = currentProgressCell.textContent;
    const currentProgressValue = parseInt(currentProgressText?.replace('%', '') || '0');

    // Verify progress increased from 15%
    expect(currentProgressValue).toBeGreaterThan(15);
    expect(currentProgressValue).toBeLessThanOrEqual(100);

    expect(within(row1).getByRole('button', { name: /issue invoice/i })).toBeInTheDocument();

    // Check that lastClickProgress shows the original progress value (15%)
    expect(within(row1).getByText('15%')).toBeInTheDocument(); // Last invoice issue

    // Check for today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    expect(within(row1).getByText(today)).toBeInTheDocument();

    expect(within(row2).getByText('2')).toBeInTheDocument();
    expect(within(row2).getByText('Anti-Hero')).toBeInTheDocument();
    expect(within(row2).getByText('Taylor Swift')).toBeInTheDocument();
    expect(within(row2).getByText('27%')).toBeInTheDocument();
    expect(within(row2).getByRole('button', { name: /issue invoice/i })).toBeInTheDocument();
    // Check that row2 has N/A in both invoice columns
    const row2Cells = within(row2).getAllByRole('cell');
    const lastInvoiceIssueCell = row2Cells[5]; // Last Invoice Issue column
    const lastIssueDateCell = row2Cells[6]; // Last Issue Date column
    expect(lastInvoiceIssueCell).toHaveTextContent('N/A');
    expect(lastIssueDateCell).toHaveTextContent('N/A');
  });
});
