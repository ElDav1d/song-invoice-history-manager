import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '@/features/songs-table/domain/entities/Song';
import { IssueInvoicePayload } from '@/features/songs-table/application/hooks/useSongsActions';
import { loadPersistedState } from '@/shared/application/store/persistenceMiddleware';

interface SongsSliceState {
  songs: Song[];
}

const initialState: SongsSliceState = (() => {
  const persistedState = loadPersistedState();
  return persistedState.songs || { songs: [] };
})();

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    addNewSongs: (state, action: PayloadAction<Song[]>) => {
      const existingIds = new Set(state.songs.map((song) => song.id));
      const newSongs = action.payload.filter((song) => !existingIds.has(song.id));

      state.songs.push(...newSongs);
    },
    issueNewInvoice: (state, action: PayloadAction<IssueInvoicePayload>) => {
      const song = state.songs.find((song) => song.id === action.payload.id);

      if (song) {
        song.lastClickDate = action.payload.dateIssued;
        song.lastClickProgress = action.payload.progressAtIssue;

        // FAKE: Simulate progress increase after invoice issuance (add 05%)
        // Helps monkey test the UI
        if (song.progress !== 1) {
          song.progress = Math.min(action.payload.progressAtIssue + 0.05, 1);
        }
      }
    },
  },
});

export const { issueNewInvoice, addNewSongs } = songsSlice.actions;
export default songsSlice.reducer;
