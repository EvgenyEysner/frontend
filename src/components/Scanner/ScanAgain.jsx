import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { BsUpcScan } from 'react-icons/bs';

export const ScanAgain = ({ error, navigate }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="50vh"
    >
      {error && (
        <Typography variant="h5" color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
      <Button
        onClick={() => navigate('/scan')}
        aria-label="Open barcode scanner"
        variant="outlined"
        sx={{ mb: 3 }} // Diese Zeile fügt Abstand hinzu
      >
        <BsUpcScan fontSize="48px" />
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/scan')}
      >
        Scan again
      </Button>
    </Box>
  );
};
