import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectEnergy,
  toggleSlider,
  removeEnergyFromHistory,
  addToHistory,
} from './energyCheckinSlice';
import lightning from "../../../src/Lightning.png"
import styles from './EnergyCheckin.module.css';

export default function EnergyCheckin() {
  //state variables:
  const sliderOpen = useSelector(state => state.energyCheckin.sliderOpen);
  const energy = useSelector(state => state.energyCheckin.todaysEnergy);
  const latestDateStored = useSelector(state => state.energyCheckin.energyHistory.at(-1).date);
  const dispatch = useDispatch();

  function handleChange(e) {
    let date = new Date();
    let today = date.getDay();
    const energyValue = e.target.value;

    dispatch(selectEnergy(energyValue));
  
    if (today === latestDateStored){
      dispatch(removeEnergyFromHistory())
    }

    dispatch(addToHistory({
      date: today,
      energy: energyValue,
    })); 
  }  


//check sliderOpen state and display either slider or lightning picture:
  return (
    <>
      <div className={styles.container}>
        <div className={styles.energyContainer}>
          <button className={styles.energyButton} onClick={() => dispatch(toggleSlider())}>
            <img src={lightning} alt="lightning" className={styles.lightning}/>
          </button>
        </div>
      </div>
      {sliderOpen && 
        <div className={styles.sliderContainer}>
          <input name="energy-slider" type="range" min="0" max="100" step="10" 
          className={styles.slider} value={energy} id="energy-slider" onChange={handleChange}/>
          <p className={styles.energyValue}>{energy}</p> 
          <button className={styles.closeButton} onClick={() => dispatch(toggleSlider())}>Close</button>
        </div>
      }
    </> 
  )
}




