import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '@/features/songs-table/domain/entities/Song';
import { IssueInvoicePayload } from '@/features/songs-table/application/hooks/useSongsActions';

interface SongState extends Song {
  lastClickDate?: string;
  lastClickProgress?: number;
}

interface SongsSliceState {
  songs: SongState[];
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
      state.songs.push(...action.payload);

      localStorage.setItem('__songs__state__', JSON.stringify(state));
    },
    issueNewInvoice: (state, action: PayloadAction<IssueInvoicePayload>) => {
      const song = state.songs.find((song) => song.id === action.payload.id);
      const now = new Date().toISOString();

      if (song) {
        song.lastClickDate = now;
        song.lastClickProgress = action.payload.progressAtIssue;

        localStorage.setItem('__songs__state__', JSON.stringify(state));
      }
    },
  },
});

export const { issueNewInvoice, addNewSongs } = songsSlice.actions;
export default songsSlice.reducer;
