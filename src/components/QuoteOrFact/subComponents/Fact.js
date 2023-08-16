import React, { useState, useEffect } from 'react';
import { Skeleton, Box } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

//this component brings in 'facts' from API Ninjas and returns them to App.js for rendering.
function Fact() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);
  //calling the API and setting fact to the response which comes back as an array object. you can find more information here https://api-ninjas.com/api/facts
  const fetchQuote = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/fact`);
      if (response.ok) {
        const data = await response.json();
        setFact(data[0].fact);
        setLoading(false);
      } else {
        console.log(`Error: ${response.statusText}`);
        setLoading(false);
        return <p>No fact data</p>;
      }
    } catch (error) {
      console.log('error');
    }
  };

  //defining a search variable to insert as an attribute in the return, this allows the fact to be clicked and search google for more information
  const search = `https://www.google.com/search?q=${fact}`;

  useEffect(() => {
    fetchQuote();
  }, []);

  //log to test output
  //console.log('fact ' + fact)
  //returning to set the component.  The link is set to 'search' and the target is set to blank so that when the fact is clicked it will open a new tab in the browser with the google search result
  return (
    <>
      {!loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            textAlign: 'left'
          }}
        >
          <a href={search} target="blank">
            {fact}<LaunchIcon sx={{ height: '1rem' }} />
          </a>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
          }}
        >
          <Skeleton
            variant="rounded"
            height={'1.25rem'}
            width="100%"
            animation="wave"
            sx={{ mb: '.75rem' }}
          />
          <Skeleton
            variant="rounded"
            height={'1.25rem'}
            width="80%"
            animation="wave"
            sx={{ m: 0 }}
          />
        </Box>
      )}
    </>
  );
}

export default Fact;
