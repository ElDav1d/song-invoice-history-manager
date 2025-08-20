import { screen } from '@testing-library/react';
import { it, expect, beforeEach, vi } from 'vitest';
import { mockQueryStates, renderApp } from './setup';

beforeEach(() => {
  vi.restoreAllMocks();
});

it('matches snapshot', () => {
  mockQueryStates.withData();

  const { container } = renderApp();
  expect(container).toMatchSnapshot();
});

it('should render the app title', () => {
  mockQueryStates.loading();

  renderApp();

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Song Invoice History Manager'
  );
});
