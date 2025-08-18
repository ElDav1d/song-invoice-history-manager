import { render, screen } from '@testing-library/react';
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
