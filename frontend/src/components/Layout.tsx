import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = (): React.JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '1em',
        paddingRight: '1em',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '87.5em'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
