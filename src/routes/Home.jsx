import React, { useEffect } from 'react';
import styles from './Home.module.css';
import { NavigationHome } from '../components/Navigation/Navigation';
// import RedditPosts from '../features/reddit/RedditPosts';
import Notes from '../features/notes/Notes';
import Weather from '../features/weather/Weather';
import QuoteOrFact from '../components/QuoteOrFact/QuoteOrFact';
import ToDoList from '../features/to-do-list/ToDoList.js';
import WellBeingCheckin from '../components/WellBeingCheckin/WellBeingCheckin';
import Stack from '@mui/material/Stack';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <NavigationHome />
      <div className={styles.HomeContainer}>
        <div className={styles.Home}>
          <Stack
            spacing={'4rem'}
            alignItems="stretch"
            direction="column"
            sx={{ width: '100%' }}
          >
            <Stack
              spacing={'1rem'}
              direction={{ xs: 'column', sm: 'row' }}
              alignItems="flex-start"
              sx={{ width: '100%' }}
            >
              <Weather />
              <QuoteOrFact />
            </Stack>
            {/* <RedditPosts /> */}
            <Notes />
            <WellBeingCheckin />
            <ToDoList />
          </Stack>
        </div>
      </div>
    </>
  );
}
