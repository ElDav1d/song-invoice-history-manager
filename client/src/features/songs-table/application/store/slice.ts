import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '@/features/songs-table/domain/entities/Song';
import { IssueInvoicePayload } from '@/features/songs-table/application/hooks/useSongsActions';

interface SongState extends Song {
  lastClickDate?: Date;
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
    issueNewInvoice: (state, action: PayloadAction<IssueInvoicePayload>) => {
      const song = state.songs.find((song) => song.id === action.payload.id);
      const now = new Date();

      if (song) {
        song.lastClickDate = now;
        song.lastClickProgress = action.payload.progressAtIssue;

        localStorage.setItem('__songs__state__', JSON.stringify(state));
      }
    },
  },
});

export const { issueNewInvoice } = songsSlice.actions;
export default songsSlice.reducer;
