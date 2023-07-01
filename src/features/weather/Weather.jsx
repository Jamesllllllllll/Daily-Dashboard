import { useState, useEffect } from "react";
import { fetchPlace } from "../../utils/fetchPlace";

const url = "https://api.weatherapi.com/v1/forecast.json?";

const API_KEY = "key=0561c4bba9b34aae89c111806231206";
// Will need to hide API key with Vercel Environment Variables

// This will be changed by either a prompt to enter city, or detecting location

const Weather = () => {
  // This components' state can be refactored to use the Redux store if necessary
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

  const params = "&q=" + city + "&days=1&aqi=no&alerts=no";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) {
      return;
    } else {
      setShowWeather(true);
    }
  };

  const weatherIconSrc = `https:${weather.current.condition.icon}`;
  const weatherIconAltText = `Current weather icon: ${weather.current.condition.text}`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`${url}${API_KEY}${params}`);
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
        } else {
          console.log(`Error: ${response.statusText}`);
          return <p>No weather data</p>;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, [city, params]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="placesAutocomplete">
          <div className="placesAutocomplete__inputWrap">
            <label htmlFor="city" className="label">
              Your city:
              {autocompleteErr && (
                <span className="inputError">{autocompleteErr}</span>
              )}
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
            <datalist id="places">
              {autocompleteCities.map((city, i) => (
                <option key={i}>{city}</option>
              ))}
            </datalist>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
      {showWeather && 
        <div>
          <p>{console.log(city)}</p>
          <img src={weatherIconSrc} alt={weatherIconAltText} />
          <p>{`${weather.current.condition.text} and ${weather.current.temp_f}° in ${weather.location.name}`}</p>
        </div>
      }
    </>
  );
  // }
};

export default Weather;
