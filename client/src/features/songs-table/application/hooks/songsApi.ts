import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Song } from '../../domain/entities/Song';
import { fetchSongs } from '../../domain/services';

const songsApi = createApi({
  reducerPath: 'songsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
    fetchFn: getSongs,
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getSongs: builder.query<Song[], void>({
      query: () => '/songs',
    }),
  }),
});

async function getSongs(input: RequestInfo | URL, init?: RequestInit) {
  // Use our vanilla service for songs endpoint
  if (
    input === `${import.meta.env.VITE_API_BASE_URL}/songs` &&
    (!init?.method || init.method === 'GET')
  ) {
    const songs = await fetchSongs();
    return new Response(JSON.stringify(songs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Fallback to default fetch for other endpoints
  return fetch(input, init);
}

export const { useGetSongsQuery } = songsApi;
export default songsApi;
