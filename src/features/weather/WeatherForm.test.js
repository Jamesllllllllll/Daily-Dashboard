import '@testing-library/jest-dom';

import fetchWeather from './Weather';
jest.mock('./Weather');

describe('Weather', () => {
  it('Fetches the weather from API', async () => {
    // Arrange
    const expectedResponse = {
      current: {
        condition: {
          text: 'Clear',
        },
      },
      temp_c: 20,
      temp_f: 68,
    };

    // Set resolved value for the next call to fetchWeather
    const mockResponse = {
      current: {
        condition: {
          text: 'Clear',
        },
      },
      temp_c: 20,
      temp_f: 68,
    };
    fetchWeather.mockResolvedValueOnce(mockResponse);

    // Act
    const actualResponse = await fetchWeather();

    // Assert
    expect(actualResponse).toEqual(expectedResponse);
  });
});
