import React, { useEffect } from 'react';
import styles from './Home.module.css';
import Navigation from '../components/Navigation/Navigation';
import RedditPosts from '../features/reddit/RedditPosts';
import Notes from '../features/notes/Notes';
import Weather from '../features/weather/Weather';
import { EmotionsCheckin } from '../features/emotionsCheckin/EmotionsCheckin';
import { EnergyCheckin } from '../features/energyCheckin/EnergyCheckin';
import { LineChart } from '../features/lineChart/LineChart';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Navigation />
      <div className={styles.Home}>
        <Weather />
        <RedditPosts />
        <Notes />
        <EmotionsCheckin />
        <EnergyCheckin />
        <LineChart />
      </div>
    </>
  );
}
