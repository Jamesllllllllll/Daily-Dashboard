export default async function handler(request, response) {
  const API_KEY = process.env.REACT_APP_MAP_API_KEY;
  const { city } = request.query;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return response.send(JSON.stringify(data));
  } catch (err) {
    return { error: "Unable to retrieve places" };
  }
}
