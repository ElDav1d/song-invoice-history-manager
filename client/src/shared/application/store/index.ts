import { configureStore } from '@reduxjs/toolkit';
import songsApi from '@/features/songs-table/application/hooks/songsApi';
import songsReducer from '@/features/songs-table/application/store/slice';
import issuedInvoicesReducer from '@/features/invoice-history/application/store/slice';
import { persistenceMiddleware } from './persistenceMiddleware';

export const store = configureStore({
  reducer: {
    [songsApi.reducerPath]: songsApi.reducer,
    songs: songsReducer,
    issuedInvoices: issuedInvoicesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(songsApi.middleware).concat(persistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
