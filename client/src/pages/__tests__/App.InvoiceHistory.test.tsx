import { screen, within } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { renderApp, mockQueryStates } from './setup';

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

it('should render a songs table with the correct title and headers', async () => {
  mockQueryStates.withNewData();

  renderApp();

  const invoiceHistorySection = screen.getByRole('region', { name: /invoice history/i });
  const invoiceHistoryTable = await within(invoiceHistorySection).findByRole('table', {
    name: /invoice-history-table/i,
  });

  expect(
    within(invoiceHistoryTable).getByRole('columnheader', { name: /date/i })
  ).toBeInTheDocument();
  expect(
    within(invoiceHistoryTable).getByRole('columnheader', { name: /author/i })
  ).toBeInTheDocument();
  expect(
    within(invoiceHistoryTable).getByRole('columnheader', { name: /song name/i })
  ).toBeInTheDocument();
  expect(
    within(invoiceHistoryTable).getByRole('columnheader', { name: /progress/i })
  ).toBeInTheDocument();
});
