// From: https://mswjs.io/docs/getting-started/mocks/rest-api

// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  // Handles fetching weather data for Weather component
  rest.get('/api/weather', (req, res, ctx) => {
    const city = req.url.searchParams.get('city');
    console.log(city);
  }),

  // Handles fetching city names for WeatherForm autocomplete
  rest.get('/api/city', (req, res, ctx) => {
    const city = req.url.searchParams.get('city');
    console.log(city);

    return res(
      ctx.status(200),
      ctx.json({
        type: 'Feature Collection',
        query: [city],
        features: [
          { place_name: 'Atlanta, Georgia, United States' },
          { place_name: 'Atlantic City, New Jersey, United States' },
          { place_name: 'Atlántida, Canelones, Uruguay' },
          { place_name: 'Atlantic Beach, Florida, United States' },
          { place_name: 'Atlantic Beach, North Carolina, United States' },
        ],
      })
    );
  }),
];
