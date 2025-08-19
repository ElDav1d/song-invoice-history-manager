import { configureStore } from '@reduxjs/toolkit';

import songsApi from '@/features/songs-table/application/hooks/songsApi';

export const store = configureStore({
  reducer: {
    [songsApi.reducerPath]: songsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(songsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
