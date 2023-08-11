import React from 'react';
//import our components
import Quote from './subComponents/Quote';
import Fact from './subComponents/Fact';
import StyledCard from '../LayoutComponents/FeatureCard';
import Box from '@mui/material/Box';

//define App component
function QuoteOrFact() {
  //create a random number - this returns a number between 0 and 1
  const quoteOrFact = Math.floor(Math.random() * 2);
  //console.log(quoteOrFact);
  //use the number stored in quoteOrFact to determine if a quote or a fact will be displayed.
  //className container is set for styling purposes
  return (
    <Box className="cardContainer" sx={{ minWidth: 600 }}>
      <h2 className="cardTitle">{quoteOrFact > 0 ? 'Quote' : 'Fact'}</h2>
      <StyledCard content={quoteOrFact > 0 ? <Quote /> : <Fact />} />
    </Box>
  );
}

export default QuoteOrFact;
