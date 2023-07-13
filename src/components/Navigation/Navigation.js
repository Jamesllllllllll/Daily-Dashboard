import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const Navigation = () => {

  return (
    <AppBar position="sticky" sx={{ marginBottom: '2rem' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Daily Dashboard
        </Typography>
        <Link to={`/settings`}>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
