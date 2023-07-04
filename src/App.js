import React from 'react';
import Weather from './features/weather/Weather';
import Notes from './components/Notes/Notes';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Weather />        
        <Notes />
      </header>
    </div>
  );
}

export default App;
