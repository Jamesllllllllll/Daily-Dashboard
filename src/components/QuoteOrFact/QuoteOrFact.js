import React from 'react'
  //import our components
import Quote from './subComponents/Quote'
import Fact from './subComponents/Fact'

//define App component
function QuoteOrFact() {
  //create a random number - this returns a number between 0 and 1
  const quoteOrFact = Math.floor(Math.random()*2)
  //console.log(quoteOrFact);
  //use the number stored in quoteOrFact to determine if a quote or a fact will be displayed.
  if (quoteOrFact > 0) {
    //className container is set for styling purposes
    return (
      <div className="container">
        <Quote />
      </div>
    )
  } else {
    return (
      <div className="container">
        <Fact/>
      </div>
    )
  }
  
}

export default QuoteOrFact;
