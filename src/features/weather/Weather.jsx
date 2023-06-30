import { useState, useEffect } from "react";

const url = "https://api.weatherapi.com/v1/forecast.json?";

const API_KEY = "key=0561c4bba9b34aae89c111806231206";
// Will need to hide API key with Vercel Environment Variables

const params = "&q=Baltimore&days=1&aqi=no&alerts=no";
// This will be changed by either a prompt to enter city, or detecting location

const Weather = () => {
    // This components' state can be refactored to use the Redux store if necessary
  const [weather, setWeather] = useState({ // Not sure why can't it be an empty object (need to define properties used)
    current: {
      temp_f: '',
      condition: {
        text: '',
        icon: '',
      }
    },
    location: {
      name: ''
    }
  });

  const weatherIconSrc = `https:${weather.current.condition.icon}`
  const weatherIconAltText = `Current weather icon: ${weather.current.condition.text}`
  
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
  }, []);
  return (
    <div>
      <img src={weatherIconSrc} alt={weatherIconAltText} /><p>{`${weather.current.condition.text} and ${weather.current.temp_f}° in ${weather.location.name}`}</p>
    </div>
  );
};

export default Weather;