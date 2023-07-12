import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEnergy,
} from './energyCheckinSlice';
import styles from './EnergyCheckin.module.css';

export function EnergyCheckin() {
  const energy = useSelector(state => state.energyCheckin.todaysEnergy);
  const dispatch = useDispatch();
/*   const storedEnergy = JSON.parse(localStorage.getItem('energy')); */
  let slider = document.getElementById("energy-slider");
 /*  let sliderValue = slider.value; */

  

  return (
    <>
      <div className={styles.sliderContainer}>
        <input name="energy-slider" type="range" min="1" max="100"  
          className={styles.slider} value={energy} id="energy-slider" onChange={(event) => dispatch(fetchEnergy(event.target.value))}/>
        <div class={styles.energyValue}>{energy}</div>
      </div>
    </>
  )
}


