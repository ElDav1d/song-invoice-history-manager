import { Middleware } from '@reduxjs/toolkit';

const STORAGE_KEY = '__invoice-history_state__';

export const loadPersistedState = () => {
  const persisted = localStorage.getItem(STORAGE_KEY);

  if (persisted) {
    return JSON.parse(persisted);
  }

  return {};
};

export const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  next(action);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
};
