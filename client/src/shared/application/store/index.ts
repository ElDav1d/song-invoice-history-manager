import { configureStore } from '@reduxjs/toolkit';
import songsApi from '@/features/songs-table/application/hooks/songsApi';
import songsReducer from '@/features/songs-table/application/store/slice';

export const store = configureStore({
  reducer: {
    [songsApi.reducerPath]: songsApi.reducer,
    songs: songsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(songsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
