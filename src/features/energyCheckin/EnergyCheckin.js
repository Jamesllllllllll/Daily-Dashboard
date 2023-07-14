import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  //I am importing the async actions from the slice reducer
  fetchEnergy,
  saveEnergy
} from './energyCheckinSlice';
import styles from './EnergyCheckin.module.css';

export function EnergyCheckin() {
  //this is the state variable: energy
  const energy = useSelector(state => state.energyCheckin.todaysEnergy);
  //I will use dispatch to call the actions
  const dispatch = useDispatch();
  //not sure how to save to localStorage when calling the action saveEnergy
  const storedEnergy = JSON.parse(localStorage.getItem('energy')); 
  //Not sure how to find the value of the slider
  let slider = document.getElementById("energy-slider");
  let sliderValue; 

  
//this is what the user sees (slider);
  return (
    <>
      <div className={styles.sliderContainer}>
        <input name="energy-slider" type="range" min="1" max="100"  
          className={styles.slider} value={energy} id="energy-slider" onChange={(event) => dispatch(fetchEnergy())}/>
        <div class={styles.energyValue}>{energy}</div>
      </div>
    </>
  )
}


