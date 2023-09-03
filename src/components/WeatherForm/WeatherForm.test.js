import React from 'react';
import WeatherForm from "./WeatherForm";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../../features/weather/weatherSlice';
import {
  updateCity,
} from '../../features/weather/weatherSlice';
import { changeCitySelector, changeCity } from '../../routes/settingsSlice';

export function renderWithProviders(
  ui,
  {
    preloadedState ={},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { city: cityReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions })}
}

it('Should show text content as Toronto', () => {  
	// Render the component to test  
	render(<WeatherForm />);  
	// Extract the textbox component  
	const textbox = screen.getByRole('textbox');  
	// Simulate typing 'Toronto'  
	userEvent.type(textbox, 'Toronto');  
	// Assert textbox has text content 'Hey Mack!'  
	expect(textbox).toHaveValue('Toronto');
});
