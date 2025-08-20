import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '@/features/songs-table/domain/entities/Song';
import { IssueInvoicePayload } from '@/features/songs-table/application/hooks/useSongsActions';

interface SongsSliceState {
  songs: Song[];
}

const initialState: SongsSliceState = (() => {
  const persisted = localStorage.getItem('__songs__state__');

  if (persisted) {
    try {
      return JSON.parse(persisted);
    } catch {
      return { songs: [] };
    }
  }

  return { songs: [] };
})();

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    addNewSongs: (state, action: PayloadAction<Song[]>) => {
      const existingIds = new Set(state.songs.map((song) => song.id));
      const newSongs = action.payload.filter((song) => !existingIds.has(song.id));

      state.songs.push(...newSongs);

      localStorage.setItem('__songs__state__', JSON.stringify(state));
    },
    issueNewInvoice: (state, action: PayloadAction<IssueInvoicePayload>) => {
      const song = state.songs.find((song) => song.id === action.payload.id);
      const now = new Date().toISOString();

      if (song) {
        song.lastClickDate = now;
        song.lastClickProgress = action.payload.progressAtIssue;

        // Simulate progress increase after invoice issuance (add 05%)
        if (song.progress !== 1) {
          song.progress = Math.min(action.payload.progressAtIssue + 0.05, 1);
        }

        localStorage.setItem('__songs__state__', JSON.stringify(state));
      }
    },
  },
});

export const { issueNewInvoice, addNewSongs } = songsSlice.actions;
export default songsSlice.reducer;
