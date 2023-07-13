import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Notes from './features/notes/Notes';
import Weather from './features/weather/Weather';
import { EmotionsCheckin } from './features/emotionsCheckin/EmotionsCheckin';
import { EnergyCheckin } from './features/energyCheckin/EnergyCheckin';
import { LineChart } from './features/lineChart/LineChart';

function App() {
  return (
    <>
      <Navigation />
      <div className="App">
        <Weather />
        <Notes />
        <EmotionsCheckin />
        <EnergyCheckin />
        <LineChart />
      </div>
    </>
  );
}

export default App;
