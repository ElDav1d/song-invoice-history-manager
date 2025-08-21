import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IssuedInvoice } from '@/features/invoice-history/domain/entities/IssuedInvoice';
import { loadPersistedState } from '@/shared/application/store/persistenceMiddleware';

interface IssuedInvoicesState {
  issuedInvoices: IssuedInvoice[];
}

const initialState: IssuedInvoicesState = (() => {
  const persistedState = loadPersistedState();
  return persistedState.issuedInvoices || { issuedInvoices: [] };
})();

const issuedInvoicesSlice = createSlice({
  name: 'issuedInvoices',
  initialState,
  reducers: {
    addNewIssuedInvoice: (state, action: PayloadAction<IssuedInvoice>) => {
      state.issuedInvoices.push(action.payload);
    },
  },
});

export const { addNewIssuedInvoice } = issuedInvoicesSlice.actions;
export default issuedInvoicesSlice.reducer;
