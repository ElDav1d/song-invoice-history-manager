import { screen, within, waitFor } from '@testing-library/react';
import { it, expect, vi, beforeEach } from 'vitest';
import { renderApp, mockQueryStates } from './setup';
import { clickOnIssueButtonOne, clickOnIssueButtonTwo } from './helpers';

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

it('should render invoice history table with header when invoice history exists', async () => {
  mockQueryStates.withNewData();
  renderApp();

  const invoiceHistorySection = screen.getByRole('region', { name: /invoice history/i });

  expect(
    within(invoiceHistorySection).queryByRole('table', { name: /invoice-history-table/i })
  ).toBeNull();

  await clickOnIssueButtonOne();

  await waitFor(() => {
    const invoiceHistoryTable = within(invoiceHistorySection).getByRole('table', {
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
});

it('should render invoice history rows with their data correctly', async () => {
  mockQueryStates.withNewData();
  renderApp();

  const invoiceHistorySection = screen.getByRole('region', { name: /invoice history/i });

  await clickOnIssueButtonOne();

  await waitFor(() => {
    const invoiceHistoryTable = within(invoiceHistorySection).getByRole('table', {
      name: /invoice-history-table/i,
    });

    const rows = within(invoiceHistoryTable).getAllByRole('row');
    expect(rows).toHaveLength(2); // Header + 1 data row

    const firstInvoiceRow = rows[1];
    const today = new Date().toISOString().split('T')[0];

    expect(within(firstInvoiceRow).getByText(new RegExp(today))).toBeInTheDocument();
    expect(within(firstInvoiceRow).getByText(/miley cyrus/i)).toBeInTheDocument();
    expect(within(firstInvoiceRow).getByText(/flowers/i)).toBeInTheDocument();
    expect(within(firstInvoiceRow).getByText(/15%/i)).toBeInTheDocument();
  });

  await clickOnIssueButtonTwo();

  await waitFor(() => {
    const invoiceHistoryTable = within(invoiceHistorySection).getByRole('table', {
      name: /invoice-history-table/i,
    });

    const finalRows = within(invoiceHistoryTable).getAllByRole('row');
    expect(finalRows).toHaveLength(3); // Header + 2 data rows now

    const secondInvoiceRow = finalRows[2];
    const today = new Date().toISOString().split('T')[0];
    expect(within(secondInvoiceRow).getByText(new RegExp(today))).toBeInTheDocument();
    expect(within(secondInvoiceRow).getByText(/taylor swift/i)).toBeInTheDocument();
    expect(within(secondInvoiceRow).getByText(/anti-hero/i)).toBeInTheDocument();
    expect(within(secondInvoiceRow).getByText(/27%/i)).toBeInTheDocument(); // Original progress at time of invoice
  });
});

it('should render an empty invoice history message when no invoices exist', async () => {
  mockQueryStates.withNewData();
  renderApp();

  const invoiceHistorySection = screen.getByRole('region', { name: /invoice history/i });

  expect(within(invoiceHistorySection).getByRole('heading', { level: 3 })).toHaveTextContent(
    /no issued invoices/i
  );
});
