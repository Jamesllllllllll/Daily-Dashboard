import React from 'react';
import styles from './Home.module.css';
import Navigation from '../components/Navigation/Navigation';
import Notes from '../features/notes/Notes';
import Weather from '../features/weather/Weather';
import QuoteOrFact from '../components/QuoteOrFact/QuoteOrFact';
import { EmotionsCheckin } from '../features/emotionsCheckin/EmotionsCheckin';
import { EnergyCheckin } from '../features/energyCheckin/EnergyCheckin';
import { LineChart } from '../features/lineChart/LineChart';
import ToDoList from '../features/to-do-list/ToDoList.js';

export default function Home() {
  return (
    <>
      <Navigation />
      <div className={styles.Home}>
        <Weather />
        <QuoteOrFact />
        <Notes />
        <EmotionsCheckin />
        <EnergyCheckin />
        <LineChart />
        <ToDoList />
      </div>
    </>
  );
}
