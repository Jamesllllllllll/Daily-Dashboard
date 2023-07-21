export default async function handler(request, response) {
  
    const {REACT_APP_X_Api_Key} = process.env 
    const options = {headers: { 'X-Api-Key': REACT_APP_X_Api_Key}, mode: 'cors' }
    const {category} = request.query;
    const url = `https://api.api-ninjas.com/v1/quotes?category=${category}`
  
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        const data = await res.json();
        return response.send(JSON.stringify(data));
      }
    } catch (err) {
      return { error: "Unable to retrieve quote" };
    }
  }
  