import { useSelector } from 'react-redux';
import {
  citySelector,
  weatherSelector,
  defaultWeatherSelector,
} from './weatherSlice';
import WeatherForm from '../../components/WeatherForm/WeatherForm';

const Weather = () => {
  const city = useSelector(citySelector);

  const weather = useSelector(weatherSelector);
  const defaultWeather = useSelector(defaultWeatherSelector);

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

  return JSON.stringify(weather) === JSON.stringify(defaultWeather) ? (
    // Using function call here because form component re-renders on every keystroke.
    // I tried adding keys to the component, form and input but nothing worked!
    <WeatherForm />
  ) : (
    <CurrentWeather />
  );
};

export default Weather;
