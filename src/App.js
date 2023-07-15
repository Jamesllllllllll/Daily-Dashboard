import { createRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Home from './routes/Home';
import Settings from './routes/Settings';
import ArticlePage from './routes/ArticlePage';
import './App.css';

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

export default function App() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  return (
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
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
  );
}