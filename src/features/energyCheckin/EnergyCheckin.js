import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectEnergy,
  toggleSlider,
  removeEnergyFromHistory,
  addToHistory,
} from './energyCheckinSlice';
import lightning from '../../../src/Lightning.png';
import styles from './EnergyCheckin.module.css';
import { Button } from '@mui/material';

export default function EnergyCheckin() {
  //state variables:
  const sliderOpen = useSelector((state) => state.energyCheckin.sliderOpen);
  const energy = useSelector((state) => state.energyCheckin.todaysEnergy);
  const latestDateStored = useSelector(
    (state) => state.energyCheckin.energyHistory.at(-1).date
  );
  const dispatch = useDispatch();

  function handleChange(e) {
    let date = new Date();
    let today = date.getDay();
    const energyValue = e.target.value;

    dispatch(selectEnergy(energyValue));

    if (today === latestDateStored) {
      dispatch(removeEnergyFromHistory());
    }

    dispatch(
      addToHistory({
        date: today,
        energy: energyValue,
      })
    );
  }

  //check sliderOpen state and display either slider or lightning picture:
  return (
    <div className={styles.energyContainer} data-testid="energyCheckin">
      <button
        className={styles.button}
        onClick={() => dispatch(toggleSlider())}
        data-testid='openEnergySlider'
      >
        <img src={lightning} alt='lightning' className={styles.lightning} />
      </button>
      {sliderOpen && (
        <div className={styles.sliderContainer}>
          <input
            name='energy-slider'
            type='range'
            min='0'
            max='100'
            step='10'
            className={styles.slider}
            value={energy}
            id='energy-slider'
            onChange={handleChange}
            data-testid='energySlider'
          />
          <p className={styles.energyValue} 
            data-testid='energy'>
            {energy}
          </p>

          <Button
            onClick={() => dispatch(toggleSlider())}
            sx={{ alignSelf: 'center' }}
            data-testid='saveEnergy'
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
