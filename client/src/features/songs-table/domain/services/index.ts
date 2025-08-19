import { Song } from '../entities/Song';

export const fetchSongs = async (): Promise<Song[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/songs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch songs: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
