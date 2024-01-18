import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCity, updateWeather } from '../../features/weather/weatherSlice';
import { changeCitySelector, changeCity } from '../../routes/settingsSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const WeatherForm = () => {
  const dispatch = useDispatch();

  const wantToChangeCity = useSelector(changeCitySelector);

  const [localCity, setLocalCity] = useState('');
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState('');

  // More on this city picker here: https://javascript.plainenglish.io/create-a-simple-city-autocomplete-field-in-react-f7675d249c74#5057
  const handleCityChange = async (e) => {
    setLocalCity(e.target.value);

    const response = await fetch(`/api/city?city=${localCity}`);
    if (response.ok) {
      const data = await response.json();
      !autocompleteCities.includes(e.target.value) &&
        data.features &&
        setAutocompleteCities(data.features.map((place) => place.place_name));
    }

    response.error
      ? setAutocompleteErr(response.error)
      : setAutocompleteErr('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localCity) {
      dispatch(updateCity(localCity));
      fetchWeather();
      dispatch(changeCity(!wantToChangeCity));
    }
  };

  const fetchWeather = async () => {
    //uncommented this function to clear eslint errors
    try {
      const response = await fetch(`/api/weather?city=${localCity}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(updateWeather(data));
      } else {
        console.log(`Error: ${response.statusText}`);
        return <p>No weather data</p>;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='city' className='label'>
        <Typography sx={{ display: 'inline' }}>Enter your city:</Typography>
      </label>
      <TextField
        sx={{ mx: '1rem' }}
        variant='standard'
        list='places'
        type='text'
        id='city'
        name='city'
        onChange={handleCityChange}
        value={localCity}
        required
        pattern={autocompleteCities.join('|')}
        autoComplete='off'
      />
      {autocompleteErr && <span className='inputError'>{autocompleteErr}</span>}
      {/* The datalist element gives the available options for the input. 
              The id="places" ties it to the element above with list="places" */}
      <datalist id='places'>
        {autocompleteCities.map((city, i) => (
          <option key={i}>{city}</option>
        ))}
      </datalist>
      <Button type='submit' className='button' variant='outlined'>
        Submit
      </Button>
    </form>
  );
};

export default WeatherForm;
