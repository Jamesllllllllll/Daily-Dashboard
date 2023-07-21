import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <AppBar position="sticky" sx={{ marginBottom: '2rem' }}>
      <Toolbar>
        {location.pathname === '/' ? (
          <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Daily Dashboard
            </Typography>
            <Link to={`/settings`}>
              <IconButton>
                <SettingsIcon sx={{ color: '#fff'}} />
              </IconButton>
            </Link>
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Link to={`/`}>
              <Button>
                <CloseIcon sx={{ color: '#fff'}} /> <Typography sx={{ color: '#fff'}}>Close</Typography>
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
