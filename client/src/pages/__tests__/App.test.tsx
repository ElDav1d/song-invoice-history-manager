import { render, screen, within } from '@testing-library/react';
import { it, expect } from 'vitest';
import App from '../App';

it('should work', () => {
  expect(1 + 1).toBe(2);
});

it('should render the app title', () => {
  render(<App />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Song Invoice History Manager'
  );
});

it('should render a songs table with the correct headers', () => {
  render(<App />);

  const songsTable = screen.getByRole('table', { name: /songs/i });

  expect(within(songsTable).getByRole('columnheader', { name: 'ID' })).toBeInTheDocument();
  expect(within(songsTable).getByRole('columnheader', { name: 'Song name' })).toBeInTheDocument();
  expect(within(songsTable).getByRole('columnheader', { name: 'Author' })).toBeInTheDocument();
  expect(within(songsTable).getByRole('columnheader', { name: 'Progress' })).toBeInTheDocument();
  expect(within(songsTable).getByRole('columnheader', { name: '' })).toBeInTheDocument();
});
