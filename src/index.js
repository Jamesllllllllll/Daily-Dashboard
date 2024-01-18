import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store';
import App from './App';
import ErrorPage from './routes/error-page';
import Settings from './routes/Settings';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Home from './routes/Home';
import { CssBaseline } from '@mui/material';
import ArticlePage from './routes/ArticlePage';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: '/',
        element: <Home />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/article/:id',
        element: <ArticlePage />,
      },
      {
        path: '/article/:id',
        element: <ArticlePage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <CssBaseline /> {/* Added CSS Baseline  as it was imported but not in use*/}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
