import React, { useState, useEffect } from 'react'


//this component brings in 'quotes' from API Ninjas and returns them to App.js for rendering.
function Quote() {
    //define apikey, url to call, set headers and initialize quote and author
  const {REACT_APP_X_Api_Key} = process.env 
  console.log('API ' + REACT_APP_X_Api_Key)
  const options = {headers: { 'X-Api-Key': REACT_APP_X_Api_Key} }
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

    //the category array is comprised of the list of possible quote categories provided by API Ninjas
  const category=["age", "alone", "amazing", "anger", "architecture", "art", "attitude", "beauty", "best", "birthday", "business", "car", "change", "communications", "computers", "cool", "courage", "dad", "dating", "death", "design", "dreams", "education", "environmental", "equality", "experience", "failure", "faith", "family", "famous", "fear", "fitness", "food", "forgiveness", "freedom", "friendship", "funny", "future", "god", "good", "government", "graduation", "great", "happiness", "health", "history", "home", "hope", "humor", "imagination", "inspirational", "intelligence", "jealousy", "knowledge", "leadership", "learning", "legal", "life", "love", "marriage", "medical", "men", "mom", "money", "morning", "movies", "success"]

    //defining a number to act as an index so that the quote category can be randomized.  In the future, may add functionality to turn on or select the categories to recieve quotes from.
  const categoryIndex =Math.floor(Math.random() * category.length)
  //console.log(category.length);
  //console.log(categoryIndex)
  //console.log(category[categoryIndex])

  const url = `https://api.api-ninjas.com/v1/quotes?category=${category[categoryIndex]}`
    
    //calling the API and setting quote and author to the response which comes back as an array object. you can find more information here https://api-ninjas.com/api/facts
  const fetchQuote = async () => {
    try {
      const response = await fetch(`${url}`, options);
      if (response.ok) {
        const data = await response.json();
        setQuote(data[0].quote);
        setAuthor(data[0].author)
      } else {
        console.log(`Error: ${response.statusText}`);
        return <p>No quote data</p>;
      }
    } catch (error) {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchQuote()
  }, [])

    //link variable is defined to pull a wikipedia article for the returned author. No special syntax was given, url  auto corrects for spacing within author
  const link = `https://en.wikipedia.org/wiki/${author}`
  //console.log(link);
  //console.log('quote ' + quote)

    //Returning quote and author to be exported to App.js. The link for author is set to 'link' and the target is set to blank so that when the fact is clicked it will open a new tab in the browser with the specific Wikipedia article for that author
  return (
    <>
      <p> {quote} </p>
      <p>-<a id="author" href={link} target="blank">{author}</a> </p>
    </>
    
  )
}

export default Quote;
