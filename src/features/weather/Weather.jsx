import { useSelector } from 'react-redux';
import {
  citySelector,
  weatherSelector,
  defaultWeatherSelector,
} from './weatherSlice';
import WeatherForm from '../../components/WeatherForm/WeatherForm';
import Box from '@mui/material/Box';
import StyledCard from '../../components/LayoutComponents/FeatureCard';
import Typography from '@mui/material/Typography';

const Weather = () => {
  const city = useSelector(citySelector);

  const weather = useSelector(weatherSelector);
  const defaultWeather = useSelector(defaultWeatherSelector);
  const showForm = JSON.stringify(weather) === JSON.stringify(defaultWeather);

  const weatherIconSrc = `https:${weather.current.condition.icon}`;
  const weatherIconAltText = `Current weather icon: ${weather.current.condition.text}`;

  const CurrentWeather = () => {
    return (
      <>
        <img src={weatherIconSrc} alt={weatherIconAltText} />
        <Typography>{`${weather.current.condition.text} and ${
          city.includes('United States')
            ? weather.current.temp_f
            : weather.current.temp_c
        }° in ${weather.location.name}`}</Typography>
      </>
    );
  };

  return (
    <Box className="cardContainer">
      <h2 className="cardTitle">Weather</h2>
      <StyledCard content={showForm ? <WeatherForm /> : <CurrentWeather />} />
    </Box>
  );
};

export default Weather;
