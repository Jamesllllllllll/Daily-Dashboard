import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectEnergy,
  toggleSlider,
  removeEnergyFromHistory,
  addToHistory,
} from './energyCheckinSlice';
import lightning from "../../../src/Lightning.png";
import Button from '@mui/material/Button';
import { CSSTransition } from 'react-transition-group'; 
import styles from './EnergyCheckin.module.css';
import '../../index.css';

export default function EnergyCheckin() {
  //state variables:
  const sliderOpen = useSelector(state => state.energyCheckin.sliderOpen);
  const energy = useSelector(state => state.energyCheckin.todaysEnergy);
  const latestDateStored = useSelector(state => state.energyCheckin.energyHistory.at(-1).date);
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

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
    <div className={styles.sliderContainer}>
      <img src={lightning} alt="lightning" className={styles.lightning} onClick={() => dispatch(toggleSlider())}/>
      <div style={{ overflow: 'hidden', width: '100%' }}>
      <CSSTransition nodeRef={nodeRef} in={sliderOpen} timeout={500} classNames="sliderMount" unmountOnExit>
          <div ref={nodeRef} style={{ width: '100%' }} class={styles.sliderInputContainer}>
          <input name="energy-slider" type="range" min="0" max="100" step="1" 
          className={styles.slider} value={energy} id="energy-slider" onChange={handleChange} style={{}}/>
          <p className={styles.energyValue}>{energy}</p> 
          <Button variant="outlined" onClick={() => dispatch(toggleSlider())} sx={{ alignSelf: 'center' }}>Close</Button>
        </div>
      </CSSTransition>
      </div>
    </div>   
  )
}




