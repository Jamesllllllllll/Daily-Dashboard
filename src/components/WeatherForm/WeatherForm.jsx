import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateCity,
} from '../../features/weather/weatherSlice';
import { changeCitySelector, changeCity } from '../../routes/settingsSlice';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styles from './WeatherForm.module.css';

const WeatherForm = () => {
  const dispatch = useDispatch();

  const wantToChangeCity = useSelector(changeCitySelector);

  const [localCity, setLocalCity] = useState('');
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState('');

  const debouncedCity = useDebounce(localCity, 500);

  // More on this city picker here: https://javascript.plainenglish.io/create-a-simple-city-autocomplete-field-in-react-f7675d249c74#5057
  const handleCityChange = (e) => {
    setLocalCity(e.target.value);
  };

  useEffect(() => {
    const fetchCities = async () => {
      if (!debouncedCity || autocompleteCities.includes(debouncedCity)) return;

      try {
        const response = await fetch(`/api/city?city=${debouncedCity}`);
        if (response.ok) {
          const data = await response.json();
          setAutocompleteCities(data.features.map((place) => place.place_name));
        } else {
          setAutocompleteErr('Failed to fetch cities');
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        setAutocompleteErr('An error occurred');
      }
    };

    fetchCities();
  }, [debouncedCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localCity) {
      dispatch(updateCity(e.target.textContent)); // this used to be e.target.value when it was taking the input
      // fetchWeather(e.target.textContent);
      dispatch(changeCity(!wantToChangeCity));
      setLocalCity(e.target.textContent);
    }
  };

  // const fetchWeather = async (newCity) => {
  //   try {
  //     const response = await fetch(`/api/weather?city=${newCity}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       dispatch(updateWeather(data));
  //     } else {
  //       console.log(`Error: ${response.statusText}`);
  //       return <p>No weather data</p>;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor='city' className='label'>
          <Typography>Enter your city:</Typography>
        </label>
        <TextField
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
          data-testid='weather-form'
        />
        {/* The datalist element gives the available options for the input. 
              The id="places" ties it to the element above with list="places" */}
        {/* <datalist id='places'>
        {autocompleteCities.map((city, i) => (
          <option key={i}>{city}</option>
        ))}
      </datalist> */}
        {/* <Button
        type='submit'
        className='button'
        variant='outlined'
        data-testid='weather-submit'
      >
        Submit
      </Button> */}
      </form>
      {autocompleteErr && <span className='inputError'>{autocompleteErr}</span>}
      {}
      <div>
        <ul className={styles.list}>
          {autocompleteCities.map((city, i) => (
            <li key={i} onClick={handleSubmit} className={styles.option} data-testid={`cityPicker-${i}`}>
              {city}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WeatherForm;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
