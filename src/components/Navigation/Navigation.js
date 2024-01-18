import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const NavigationHome = () => {
  return (
    <Toolbar>
      <>
        <Typography
          className="appTitle"
          component="div"
          sx={{ flexGrow: 1, color: '#2b2d6e' }}
        >
          Daily Dashboard
        </Typography>
        <Link to={`/settings`}>
          <IconButton sx={{ visibility: { xs: 'collapse', sm: 'visible' } }}>
            <SettingsIcon sx={{ color: '#aeaeae' }} />
          </IconButton>
        </Link>
      </>
    </Toolbar>
  );
};

export const NavigationSettings = () => {
  return (
    <Toolbar>
      <>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Link to={`/`}>
          <Button sx={{ visibility: { xs: 'collapse', sm: 'visible' } }}>
            <CloseIcon sx={{ color: '#aeaeae' }} />{' '}
            <Typography sx={{ color: '#aeaeae', fontSize: '.9rem' }}>
              Close
            </Typography>
          </Button>
        </Link>
      </>
    </Toolbar>
  );
};
