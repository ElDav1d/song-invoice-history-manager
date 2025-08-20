import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../shared/application/store';
import App from '../App';
import { mockedSongs } from './mocks';

// Mock the vanilla service
vi.mock('@/features/songs-table/domain/services', () => ({
  fetchSongs: vi.fn(),
}));

// Mock the RTK Query API
vi.mock('@/features/songs-table/application/hooks/songsApi', () => ({
  default: {
    reducerPath: 'songsApi',
    reducer: (state = {}) => state,
    middleware: (_store: any) => (next: any) => (action: any) => next(action),
    util: {
      resetApiState: vi.fn(),
    },
  },
  useGetSongsQuery: vi.fn(),
}));

// Import the mocked hook after the mock
import { useGetSongsQuery } from '@/features/songs-table/application/hooks/songsApi';

// Helper function to render App with Provider
const renderApp = () => {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

// Mock query states
const mockQueryStates = {
  loading: () =>
    vi.mocked(useGetSongsQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    } as any),

  error: () =>
    vi.mocked(useGetSongsQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Failed to fetch'),
      refetch: vi.fn(),
    } as any),

  empty: () =>
    vi.mocked(useGetSongsQuery).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    } as any),

  withData: () =>
    vi.mocked(useGetSongsQuery).mockReturnValue({
      data: mockedSongs,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    } as any),
};

export { renderApp, mockQueryStates };
