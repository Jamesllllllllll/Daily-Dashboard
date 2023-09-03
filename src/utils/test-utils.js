// This creates a reusable "Wrapper" component that creates a new Redux store instance
// every time it's called, with an optional `preloadedState` value that can be used
// for an initial value
// https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function

import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, combineReducers } from 'react-redux';

// setupStore sends the rootReducer from app/store
import { setupStore } from '../app/store';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
