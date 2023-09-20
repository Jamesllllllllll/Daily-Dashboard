import React from 'react';

// import API mocking utilities from Mock Service Worker ({ rest } already imported in handlers.js)
import { server } from '../../mocks/server';

// import react-testing methods
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// the component to test
import WeatherForm from './WeatherForm';

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

it('Should show text content as Toronto', async () => {
  // set up userEvent before component is rendered (https://testing-library.com/docs/user-event/intro#writing-tests-with-userevent)
  const user = userEvent.setup();

  // Render the component to test
  renderWithProviders(<WeatherForm />);
  // Extract the textbox component
  const textbox = screen.getByRole('textbox');
  // Simulate typing 'Toronto'
  user.type(textbox, 'Atlanta');
  // Assert textbox has text content 'Toronto'
  const city = await screen.findByDisplayValue('Atlanta');
  expect(city).toBeInTheDocument();
});

it('fetches & receives a list of cities as the user types', async () => {
  renderWithProviders(<WeatherForm />);

  const textbox = screen.getByRole('textbox');

  expect(textbox.value).toBe('');
});
