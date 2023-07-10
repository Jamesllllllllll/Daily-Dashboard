import React from 'react';
import './App.css';
import Notes from './features/notes/Notes';
import Weather from './features/weather/Weather';
import { EmotionsCheckin } from './features/emotionsCheckin/EmotionsCheckin';
import { EnergyCheckin } from './features/energyCheckin/EnergyCheckin';
import { LineChart } from './features/lineChart/LineChart';
import QuoteOrFact from './components/QuoteOrFact/QuoteOrFact'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Daily Dashboard App </h1>        
      </header>
      <Weather />
      <QuoteOrFact />
      <Notes />
      <EmotionsCheckin />
      <EnergyCheckin />
      <LineChart />
    </div>
  );
}

export default App;
