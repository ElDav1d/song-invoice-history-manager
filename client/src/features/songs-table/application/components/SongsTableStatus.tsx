import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

interface SongsTableStatusProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}

const SongsTableStatus: React.FC<SongsTableStatusProps> = ({ isLoading, isError, isEmpty }) => {
  if (isLoading) {
    return <CircularProgress aria-label="loading songs" />;
  }
  if (isError) {
    return <h3>Failed to fetch songs</h3>;
  }
  if (isEmpty) {
    return <h3>No songs available</h3>;
  }
  return null;
};

export default SongsTableStatus;
