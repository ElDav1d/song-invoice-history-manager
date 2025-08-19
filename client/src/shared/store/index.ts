import { configureStore } from '@reduxjs/toolkit';
import dummyReducer from './dummySlice';
import songsApi from '@/features/songs-table/application/hooks/songsApi';

export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    [songsApi.reducerPath]: songsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(songsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
