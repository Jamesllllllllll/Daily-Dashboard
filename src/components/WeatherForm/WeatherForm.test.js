import React from 'react';
import { rest } from 'msw';
import server from '../../mocks/server';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';
import WeatherForm from './WeatherForm';
import '@testing-library/jest-dom';

//-----------------------
// None of these are required since we are using renderWithProviders! - James
//-----------------------
//
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import weatherReducer from '../../features/weather/weatherSlice';
// import {
//   updateCity,
// } from '../../features/weather/weatherSlice';
// import { changeCitySelector, changeCity } from '../../routes/settingsSlice';
//
//-----------------------

it('Should show text content as Toronto', async () => {
  // set up userEvent before component is rendered (https://testing-library.com/docs/user-event/intro#writing-tests-with-userevent)
  const user = userEvent.setup();

  // Render the component to test
  renderWithProviders(<WeatherForm />);
  // Extract the textbox component
  const textbox = screen.getByRole('textbox');
  // Simulate typing 'Toronto'
  user.type(textbox, 'Toronto');
  // Assert textbox has text content 'Toronto'
  const city = await screen.findByDisplayValue('Toronto');
  expect(city).toBeInTheDocument();
});

it('fetches & receives a list of cities as the user types', async () => {
	renderWithProviders(<WeatherForm />)

	const textbox = screen.getByRole('textbox');

	expect(textbox.value).toBe('');
})
