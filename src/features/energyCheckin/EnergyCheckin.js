import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectEnergy,
  removeEnergyFromHistory,
  addToHistory,
} from './energyCheckinSlice';
import styles from './EnergyCheckin.module.css';

export function EnergyCheckin() {
  //state variables:
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

//this is what the user sees (slider);
  return (
    <>
      <div className={styles.sliderContainer}>
        <input name="energy-slider" type="range" min="0" max="100" step="10" 
          className={styles.slider} value={energy} id="energy-slider" onChange={handleChange}/>
        <h3 className={styles.energyValue}>{energy}</h3>
      </div>
    </>
  )
}


