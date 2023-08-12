import { createRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Home from './routes/Home';
import Settings from './routes/Settings';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import { CssBaseline } from '@mui/material';

const routes = [
  { path: '/', name: 'Home', element: <Home />, nodeRef: createRef() },
  {
    path: '/settings',
    name: 'Settings',
    element: <Settings />,
    nodeRef: createRef(),
  },
];

// const theme = createTheme({
//   palette: {
//     primary: lime,
//     secondary: purple,
//   },
// });

export default function App() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  return (
    // <ThemeProvider theme={theme}>
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
    // </ThemeProvider>
  );
}
