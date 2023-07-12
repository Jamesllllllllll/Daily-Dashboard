import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  citySelector,
  weatherSelector,
  defaultWeatherSelector,
  updateCity,
  updateWeather,
} from "./weatherSlice";

const Weather = () => {
  const dispatch = useDispatch();

  const city = useSelector(citySelector);

  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");

  const weather = useSelector(weatherSelector);
  const defaultWeather = useSelector(defaultWeatherSelector);

  // More on this city picker here: https://javascript.plainenglish.io/create-a-simple-city-autocomplete-field-in-react-f7675d249c74#5057
  const handleCityChange = async (e) => {
    dispatch(updateCity(e.target.value));
    // setCity(e.target.value);
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
      : setAutocompleteErr("");
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
    // setCity("");
    setAutocompleteCities([]);
    setAutocompleteErr("");
  };

  const weatherIconSrc = `https:${weather.current.condition.icon}`;
  const weatherIconAltText = `Current weather icon: ${weather.current.condition.text}`;

  const fetchWeather = async () => {
    try {
      const response = await fetch(`/api/weather?city=${city}`);
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
    <>
      {JSON.stringify(weather) === JSON.stringify(defaultWeather) ? (
        <form onSubmit={handleSubmit}>
          <div className="placesAutocomplete">
            <div className="placesAutocomplete__inputWrap">
              <label htmlFor="city" className="label">
                Your city:
              </label>
              <input
                list="places"
                type="text"
                id="city"
                name="city"
                onChange={handleCityChange}
                value={city}
                required
                pattern={autocompleteCities.join("|")}
                autoComplete="off"
              />
              {autocompleteErr && (
                <span className="inputError">{autocompleteErr}</span>
              )}
              {/* The datalist element gives the available options for the input. 
                The id="places" ties it to the element above with list="places" */}
              <datalist id="places">
                {autocompleteCities.map((city, i) => (
                  <option key={i}>{city}</option>
                ))}
              </datalist>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      ) : (
        <div>
            <img src={weatherIconSrc} alt={weatherIconAltText} />
            <p>{`${weather.current.condition.text} and ${
              city.includes("United States")
                ? weather.current.temp_f
                : weather.current.temp_c
            }° in ${weather.location.name}`}</p>
          <p>
            <button onClick={changeCity}>Change city</button>
          </p>
        </div>
      )}
    </>
  );
};

export default Weather;
