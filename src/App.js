import React from 'react';
import './App.css';
import { EmotionsCheckin } from './features/emotionsCheckin/EmotionsCheckin';
import { EnergyCheckin } from './features/energyCheckin/EnergyCheckin';
import { LineChart } from './features/lineChart/LineChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Daily Dashboard App </h1>        
        <Weather />
      </header>
      <EmotionsCheckin />
      <EnergyCheckin />
      <LineChart />
    </div>
  );
}

export default App;
