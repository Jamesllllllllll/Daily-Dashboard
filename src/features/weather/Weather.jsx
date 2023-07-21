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

  // More on this city picker here: https://javascript.plainenglish.io/create-a-simple-city-autocomplete-field-in-react-f7675d249c74#5057
  const handleCityChange = async (e) => {
    dispatch(updateCity(e.target.value));
    if (!city) return;

    const response = await fetch(`/api/city?city=${city}`);
    if (response.ok) {
      const data = await response.json();
      !autocompleteCities.includes(e.target.value) &&
        data.features &&
        setAutocompleteCities(data.features.map((place) => place.place_name));
    }

    response.error
      ? setAutocompleteErr(response.error)
      : setAutocompleteErr("Error fetching cities");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) {
      return;
    } else {
      fetchWeather();
    }
  };

  const changeCity = () => {
    dispatch(updateWeather(defaultWeather));
    dispatch(updateCity(""));
    setAutocompleteCities([]);
    setAutocompleteErr("");
  };

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

  return showForm ? (
    <WeatherForm />
  ) : (
    <CurrentWeather />
  );
};

export default Weather;
