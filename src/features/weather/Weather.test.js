import React from 'react';
import { screen } from '@testing-library/react';
import Weather from './Weather';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../utils/test-utils';

describe('Weather', () => {
  describe('Component', () => {
    test('renders when the app loads', () => {
      const { getByText } = renderWithProviders(<Weather />);
      // render(<Weather />);
      expect(screen.getByText('Weather')).toBeInTheDocument();
    });
  });
});
