export default async function handler(request, response) {

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}`;
  const { city } = request.query; // or .queryStringParameters ?
  const params = "&q=" + city + "&days=1&aqi=no&alerts=no";

  try {
    const res = await fetch(`${url}${params}`);
    if (res.ok) {
      const data = await res.json();
      return response.send(JSON.stringify(data));
    }
  } catch (error) {
    return console.log(error);
  }
};