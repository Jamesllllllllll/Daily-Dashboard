import { useState } from "react";
import { fetchPlace } from "../../utils/fetchPlace";

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
// Maps & Weather API keys have been added to Vercel Environment Variables

const Weather = () => {
  // This component's state can be refactored to use the Redux store if necessary
  const [city, setCity] = useState("");
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");
  const [showWeather, setShowWeather] = useState(false);
  const [weather, setWeather] = useState({
    // Not sure why can't it be an empty object (need to define properties used)
    current: {
      temp_f: "",
      condition: {
        text: "",
        icon: "",
      },
    },
    location: {
      name: "",
    },
  });

  const url = "https://api.weatherapi.com/v1/current.json?key=";
  const params = "&q=" + city + "&days=1&aqi=no&alerts=no";

  // More on this city picker here: https://javascript.plainenglish.io/create-a-simple-city-autocomplete-field-in-react-f7675d249c74#5057
  const handleCityChange = async (e) => {
    setShowWeather(false);
    setCity(e.target.value);
    if (!city) return;

    const res = await fetchPlace(city);
    !autocompleteCities.includes(e.target.value) &&
      res.features &&
      setAutocompleteCities(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
  };

  // I changed the form to only fetch the weather on submit. Otherwise it fetches for every keystroke.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) {
      return;
    } else {
      fetchWeather();
    }
  };

  const weatherIconSrc = `https:${weather.current.condition.icon}`;
  const weatherIconAltText = `Current weather icon: ${weather.current.condition.text}`;

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${url}${weatherApiKey}${params}`);
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        setShowWeather(true);
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
      {/* Conditionally show weather if showWeather === true */}
      {showWeather && (
        <div>
          <img src={weatherIconSrc} alt={weatherIconAltText} />
          <p>{`${weather.current.condition.text} and ${city.includes('United States') ? weather.current.temp_f : weather.current.temp_c}° in ${weather.location.name}`}</p>
          {/* Conditionally display temp in farenheit if in USA, otherwise display in celcius */}
        </div>
      )}
    </>
  );
  // }
};

export default Weather;
