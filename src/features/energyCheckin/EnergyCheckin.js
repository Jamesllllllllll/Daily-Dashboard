import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateEnergy,
} from './energyCheckinSlice';
import styles from './EnergyCheckin.module.css';

export function EnergyCheckin() {

  const energy = useSelector(state => state.energyCheckin.todaysEnergy);
  const dispatch = useDispatch();
  const storedEnergy = JSON.parse(localStorage.getItem('energy'));

  return (
    <>
      <div className={styles.sliderContainer}>
        <input name="energy-slider" type="range" min="1" max="100"  
          className={styles.slider} id="energy-slider" value={energy.value} onChange={() => dispatch(updateEnergy())}/>
        <div class={styles.energyValue}>{energy}</div>
      </div>
    </>
  )
}
