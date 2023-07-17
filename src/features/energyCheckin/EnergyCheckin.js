import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectEnergy,
  addToHistory,
} from './energyCheckinSlice';
import styles from './EnergyCheckin.module.css';

export function EnergyCheckin() {
  //state variable:
  const energy = useSelector(state => state.energyCheckin.todaysEnergy);
  const dispatch = useDispatch();

  function handleChange(e) {
    let date = new Date();
    let day = date.getDay();
    const energyValue = e.target.value;
    console.log(energyValue);

    dispatch(selectEnergy(energyValue));
  
    dispatch(addToHistory({
      date: day,
      energy: energyValue,
    }));

  }


//this is what the user sees (slider);
  return (
    <>
      <div className={styles.sliderContainer}>
        <input name="energy-slider" type="range" min="1" max="100" step="10" 
          className={styles.slider} value={energy} id="energy-slider" onChange={handleChange}/>
        <h3 className={styles.energyValue}>{energy}</h3>
      </div>
    </>
  )
}


