import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Song } from '../../domain/entities/Song';
import { fetchSongs } from '../../domain/services';

const songsApi = createApi({
  reducerPath: 'songsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
    fetchFn: fetchSongsWrapper,
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getSongs: builder.query<Song[], void>({
      query: () => '/songs',
    }),
  }),
});

async function fetchSongsWrapper(input: RequestInfo | URL, init?: RequestInit) {
  // Use our vanilla service for songs endpoint
  if (
    input === `${import.meta.env.VITE_API_BASE_URL}/songs` &&
    (!init?.method || init.method === 'GET')
  ) {
    return getAllSongs();
  }

  // Fallback to default fetch for other endpoints
  return fetch(input, init);
}

async function getAllSongs() {
  try {
    const songs = await fetchSongs();
    return new Response(JSON.stringify(songs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch songs';

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const { useGetSongsQuery } = songsApi;
export default songsApi;
