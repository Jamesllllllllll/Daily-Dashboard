export default async function handler(request, response) {
  const url = 'https://ok.surf/api/v1/news-section';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sections: ["Technology"],
      }),
    });
    const jsonResponse = await res.json();

    const fiveHeadlines = jsonResponse.Technology.slice(0, 5)
    return response.send(fiveHeadlines);
    
  } catch (e) {
    console.log('Error in api call')
    console.log(e);
    return response.status(500).send('Unable to fetch news items')
  }
}
