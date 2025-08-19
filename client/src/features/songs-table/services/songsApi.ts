import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Song } from '../entities/Song';

const songsApi = createApi({
  reducerPath: 'songsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BASE_URL}` }),
  endpoints: (builder) => ({
    getSongs: builder.query<Song[], void>({
      query: () => '/songs',
    }),
  }),
});

export const { useGetSongsQuery } = songsApi;
export default songsApi;
