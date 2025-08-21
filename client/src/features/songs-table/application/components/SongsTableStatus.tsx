import { Typography } from '@mui/material';
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
    return (
      <Typography component="h3" variant="h4" sx={{ my: 2 }}>
        Failed to fetch songs
      </Typography>
    );
  }
  if (isEmpty) {
    return (
      <Typography component="h3" variant="h4" sx={{ my: 2 }}>
        No songs available
      </Typography>
    );
  }
  return null;
};

export default SongsTableStatus;
