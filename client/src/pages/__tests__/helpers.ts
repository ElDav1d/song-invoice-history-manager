import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

export const clickOnIssueButtonOne = async () => {
  const songsSection = screen.getByRole('region', { name: /songs/i });
  const songsTable = await within(songsSection).findByRole('table', { name: /songs-table/i });
  const issueInvoiceButtons = within(songsTable).getAllByRole('button', { name: /issue invoice/i });

  await user.click(issueInvoiceButtons[0]);
};

export const clickOnIssueButtonTwo = async () => {
  const songsSection = screen.getByRole('region', { name: /songs/i });
  const songsTable = await within(songsSection).findByRole('table', { name: /songs-table/i });
  const issueInvoiceButtons = within(songsTable).getAllByRole('button', { name: /issue invoice/i });

  await user.click(issueInvoiceButtons[1]);
};
