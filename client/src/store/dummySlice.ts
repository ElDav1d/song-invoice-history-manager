import { createSlice } from '@reduxjs/toolkit';

const dummySlice = createSlice({
  name: 'dummy',
  initialState: { dummy: true },
  reducers: {},
});

export default dummySlice.reducer;
