import React from 'react';
import styles from './Home.module.css';
import { NavigationHome } from '../components/Navigation/Navigation';
import Notes from '../features/notes/Notes';
import Weather from '../features/weather/Weather';
import QuoteOrFact from '../components/QuoteOrFact/QuoteOrFact';
import ToDoList from '../features/to-do-list/ToDoList.js';
import WellBeingCheckin from '../components/WellBeingCheckin/WellBeingCheckin';

export default function Home() {
  return (
    <>
      <NavigationHome />
      <div className={styles.Home}>
        <Weather />
        <QuoteOrFact />
        <Notes />
        <WellBeingCheckin />
        <ToDoList />
      </div>
    </>
  );
}
