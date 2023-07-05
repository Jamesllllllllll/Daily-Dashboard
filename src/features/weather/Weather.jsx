import { useState } from "react";
import { fetchPlace } from "../../utils/fetchPlace";

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

  // More on this city picker here: https://javascript.plainenglish.io/create-a-simple-city-autocomplete-field-in-react-f7675d249c74#5057
  const handleCityChange = async (e) => {
    setShowWeather(false);
    setCity(e.target.value);
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

  // I changed the form to only fetch the weather on submit. Otherwise it fetches for every keystroke.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) {
      return;
    } else {
      fetchWeather();
    }
  };

  const changeCity = () => {
    setShowWeather(false);
  };

  const weatherIconSrc = `https:${weather.current.condition.icon}`;
  const weatherIconAltText = `Current weather icon: ${weather.current.condition.text}`;

  const fetchWeather = async () => {
    try {
      const response = await fetch(`/api/weather?city=${city}`);
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
      {!showWeather && (
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
      )}
      {/* Conditionally show weather if showWeather === true */}
      {showWeather && (
        <div>
          <img src={weatherIconSrc} alt={weatherIconAltText} />
          <p>{`${weather.current.condition.text} and ${
            city.includes("United States")
              ? weather.current.temp_f
              : weather.current.temp_c
          }° in ${weather.location.name}`}</p>
          {/* Conditionally display temp in farenheit if in USA, otherwise display in celcius */}
          <p>
            <button onClick={changeCity}>Change city</button>
          </p>
        </div>
      )}
    </>
  );
  // }
};

export default Weather;
