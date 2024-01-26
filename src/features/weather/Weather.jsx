import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  citySelector,
  weatherSelector,
  defaultWeatherSelector,
  updateWeather,
} from './weatherSlice';
import WeatherForm from '../../components/WeatherForm/WeatherForm';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';
import StyledCard from '../../components/LayoutComponents/FeatureCard';
import Typography from '@mui/material/Typography';

const Weather = () => {
  const city = useSelector(citySelector);

  const weather = useSelector(weatherSelector);
  const defaultWeather = useSelector(defaultWeatherSelector);
  const showForm = JSON.stringify(weather) === JSON.stringify(defaultWeather);
  const [loading, setLoading] = useState(true);
  const weatherIconSrc = `https:${weather.current.condition.icon}`;
  const weatherIconAltText = `Current weather icon: ${weather.current.condition.text}`;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/weather?city=${city}`);
        if (response.ok) {
          const data = await response.json();
          dispatch(updateWeather(data));
          setLoading(false);
        } else {
          console.log(`Error: ${response.statusText}`);
          setLoading(false);
          return <p>No weather data</p>;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, [city, dispatch]);

  const CurrentWeather = () => {
    return !loading ? (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <img
          src={weatherIconSrc}
          alt={weatherIconAltText}
          height="64"
          width="64"
        />
        <Typography>{`${weather.current.condition.text} and ${
          city.includes('United States')
            ? weather.current.temp_f
            : weather.current.temp_c
        }° in ${weather.location.name}`}</Typography>
      </Box>
    ) : (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Skeleton
          variant="circular"
          width={50}
          height={50}
          animation="wave"
          sx={{ my: '1rem' }}
        />
        <Skeleton
          variant="rounded"
          width={200}
          height="1.5rem"
          animation="wave"
        />
      </Box>
    );
  };

  return (
    <Box
      className="cardContainer"
      sx={{
        width: { xs: '50%', sm: '25%' },
        minWidth: 250,
        alignSelf: { xs: 'center', sm: 'flex-start' },
      }}
    >
      <h2 className="cardTitle">Weather</h2>
      <StyledCard content={showForm && !city ? <WeatherForm /> : <CurrentWeather />} />
    </Box>
  );
};

export default Weather;
