import { screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { renderApp, mockQueryStates } from './setup';

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

it('should render a songs table with the correct title', async () => {
  mockQueryStates.withNewData();

  renderApp();

  expect(screen.getByRole('heading', { level: 2, name: /invoice history/i })).toBeInTheDocument();
});
