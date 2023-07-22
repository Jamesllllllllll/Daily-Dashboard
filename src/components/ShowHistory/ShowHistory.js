import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleLineChart
} from '../../features/lineChart/lineChartSlice'; 
import styles from './ShowHistory.module.css'


export function ShowHistory() {
  const emotionsHistory = useSelector((state) => state.emotionsCheckin.emotionsHistory);
  const energyHistory = useSelector((state) => state.energyCheckin.energyHistory); 
  const dispatch = useDispatch();

  function getDay(date){
    switch(date){
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  }
  

  return (
    <>
      {emotionsHistory.map( (object) => (
        <li key={object.name} className={styles.li}>
          {getDay(object.date)}
          <img src={object.pic}/>
        </li>
      )
      )}
      <br></br >
      {energyHistory.map( (object) => (
        <li key={object.name} className={styles.li}>
          {getDay(object.date)}
          <h3>{object.energy}</h3>
        </li>
      ))}
      <br />
      <button onClick={() => dispatch(toggleLineChart())}>Close</button>
    </>
  )
}
