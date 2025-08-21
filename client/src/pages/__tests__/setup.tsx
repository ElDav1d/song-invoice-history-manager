import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import songsApi from '@/features/songs-table/application/hooks/songsApi';
import songsReducer from '@/features/songs-table/application/store/slice';
import issuedInvoicesReducer from '@/features/invoice-history/application/store/slice';
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

// Create a fresh store for each test
const createTestStore = () => {
  return configureStore({
    reducer: {
      [songsApi.reducerPath]: songsApi.reducer,
      songs: songsReducer,
      issuedInvoices: issuedInvoicesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(songsApi.middleware),
  });
};

// Helper function to render App with fresh Provider and store
const renderApp = () => {
  const testStore = createTestStore();
  return render(
    <Provider store={testStore}>
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

  withNewData: () =>
    vi.mocked(useGetSongsQuery).mockReturnValue({
      data: mockedSongs,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    } as any),
};

export { renderApp, mockQueryStates };
