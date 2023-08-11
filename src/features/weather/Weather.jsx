import { useSelector } from 'react-redux';
import {
  citySelector,
  weatherSelector,
  defaultWeatherSelector,
} from './weatherSlice';
import WeatherForm from '../../components/WeatherForm/WeatherForm';
import styles from './weather.module.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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
      <div>
        <img src={weatherIconSrc} alt={weatherIconAltText} />
        <p>{`${weather.current.condition.text} and ${
          city.includes('United States')
            ? weather.current.temp_f
            : weather.current.temp_c
        }° in ${weather.location.name}`}</p>
      </div>
    );
  };

  return <Box><h2 className="cardTitle">Weather</h2>{showForm ? <WeatherForm /> : <CurrentWeather />}</Box>;
};

export default Weather;
