import { createRef, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Home from './routes/Home';
import Settings from './routes/Settings';
import ArticlePage from './routes/ArticlePage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import { CssBaseline } from '@mui/material';
import { BottomNavigation } from '@mui/material';
import { BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';

const routes = [
  { path: '/', name: 'Home', element: <Home />, nodeRef: createRef() },
  {
    path: '/settings',
    name: 'Settings',
    element: <Settings />,
    nodeRef: createRef(),
  },
  { path: '/article/:id', name: 'Article', element: <ArticlePage />, nodeRef: createRef() },
];

// const theme = createTheme({
//   palette: {
//     primary: lime,
//     secondary: purple,
//   },
// });

function BottomNavBar() {
  const pathName = window.location.pathname;
  const [value, setValue] = useState(pathName);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        visibility: { xs: 'visible', sm: 'collapse' },
      }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels={true}>
        <BottomNavigationAction
          label="home"
          value="/"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="settings"
          value="/settings"
          icon={<SettingsIcon />}
          component={Link}
          to="/settings"
        />
      </BottomNavigation>
    </Paper>
  );
}

export default function App() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  return (
    // <ThemeProvider theme={theme}>
    <>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={400}
          classNames="page"
          unmountOnExit
        >
          {(state) => (
            <div ref={nodeRef} className="page">
                <CssBaseline />
                {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
      <BottomNavBar />
    </>
    // </ThemeProvider>
  );
}