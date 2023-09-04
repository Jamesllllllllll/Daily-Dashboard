# Testing the Weather Form

## Display locations

The WeatherForm component is conditionally displayed in two places:

1. On the Home page if no `city` is saved to state.
2. On the Settings page in two conditions:
    - When there is no `city` saved to state.
    - If `city` does exist, the user can click a button to show the form and change cities.

## Redux Info

Current city is in '/src/features/weather/weatherSlice' as *state.weather.city*

`dispatch(updateCity)` => Change current city for fetching weather

Displaying the form is conditionally rendered depending on `wantToChangeCity` in *state.settings.changeCity*

> Note: This could be refactored into a 'utils' state, or add to Weather slice.

## Tests

### Local state

- On first loading the app, there should be no city yet.
- Test for text typed into controlled input box.
- After typing in text, there should be cities fetched and displayed as a 'datalist' type list
- When clicking on a city in the 'datalist', it should populate the input

### Redux state

- After clicking submit, it should `updateCity(city)` and `dispatch(!wantToChangeCity)`
