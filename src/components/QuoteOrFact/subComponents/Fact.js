import React, { useState, useEffect } from 'react'


// console.clear()
//this component brings in 'facts' from API Ninjas and returns them to App.js for rendering.
function Fact() {

  const [fact, setFact] = useState('');

    //calling the API and setting fact to the response which comes back as an array object. you can find more information here https://api-ninjas.com/api/facts
  const fetchQuote = async () => {
    try {
      const response = await fetch(`/api/fact`);
      if (response.ok) {
        const data = await response.json();
        setFact(data[0].fact);
      } else {
        console.log(`Error: ${response.statusText}`);
        return <p>No fact data</p>;
      }
    } catch (error) {
      console.log('error');
    }
  };

  //defining a search variable to insert as an attribute in the return, this allows the fact to be clicked and search google for more information
  const search= `https://www.google.com/search?q=${fact}`

  useEffect(() => {
    fetchQuote()
  }, [])

  //log to test output
  //console.log('fact ' + fact)
  //returning to set the component.  The link is set to 'search' and the target is set to blank so that when the fact is clicked it will open a new tab in the browser with the google search result
  return (
    <>
      <p><a href={search} target="blank">{fact}</a> </p>
    </>
  )
}

export default Fact;
