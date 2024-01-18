import React, { useState, useEffect, useMemo } from 'react';
import { Skeleton, Box } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
//this component brings in 'quotes' from API Ninjas and returns them to App.js for rendering.
function Quote() {
  //define apikey, url to call, set headers and initialize quote and author

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  //the category array is comprised of the list of possible quote categories provided by API Ninjas
  const category = useMemo(() => [
    'age',
    'alone',
    'amazing',
    'anger',
    'architecture',
    'art',
    'attitude',
    'beauty',
    'best',
    'birthday',
    'business',
    'car',
    'change',
    'communications',
    'computers',
    'cool',
    'courage',
    'dad',
    'dating',
    'death',
    'design',
    'dreams',
    'education',
    'environmental',
    'equality',
    'experience',
    'failure',
    'faith',
    'family',
    'famous',
    'fear',
    'fitness',
    'food',
    'forgiveness',
    'freedom',
    'friendship',
    'funny',
    'future',
    'god',
    'good',
    'government',
    'graduation',
    'great',
    'happiness',
    'health',
    'history',
    'home',
    'hope',
    'humor',
    'imagination',
    'inspirational',
    'intelligence',
    'jealousy',
    'knowledge',
    'leadership',
    'learning',
    'legal',
    'life',
    'love',
    'marriage',
    'medical',
    'men',
    'mom',
    'money',
    'morning',
    'movies',
    'success',
  ], []);

  //defining a number to act as an index so that the quote category can be randomized.  In the future, may add functionality to turn on or select the categories to recieve quotes from.
  const categoryIndex = Math.floor(Math.random() * category.length);

  //calling the API and setting quote and author to the response which comes back as an array object. you can find more information here https://api-ninjas.com/api/facts
  useEffect(() => {
    const fetchQuote = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/quote?category=${category[categoryIndex]}`);
        if (response.ok) {
          const data = await response.json();
          setQuote(data[0].quote);
          setAuthor(data[0].author)
        } else {
          console.log(`Error: ${response.statusText}`);
          return <p>No quote data</p>;
        }
      } catch (error) {
        console.log('Unable to retrieve quote');
      } finally {
        setLoading(false);
      }
    }
  

  
    fetchQuote();
}, [category, categoryIndex]);

  //link variable is defined to pull a wikipedia article for the returned author. No special syntax was given, url  auto corrects for spacing within author
  const link = `https://en.wikipedia.org/wiki/${author}`;
  //console.log(link);
  //console.log('quote ' + quote)

  //Returning quote and author to be exported to App.js. The link for author is set to 'link' and the target is set to blank so that when the fact is clicked it will open a new tab in the browser with the specific Wikipedia article for that author
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
          <p> {quote} </p>
          <p>
            -
            <a id="author" href={link} target="blank">
              {author}<LaunchIcon sx={{ height: '1rem' }} />
            </a>
          </p>
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
            animation="wave"
            sx={{ mb: '1.75rem' }}
          />
          <Skeleton
            variant="rounded"
            height={'1.25rem'}
            width={150}
            animation="wave"
            sx={{ m: 0 }}
          />
        </Box>
      )}
    </>
  );
}

export default Quote;
