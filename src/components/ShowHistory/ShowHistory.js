import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleCalendar
} from '../../features/calendar/calendarSlice'; 
import styles from './ShowHistory.module.css';


export function ShowHistory() {
  const emotionsHistory = useSelector((state) => state.emotionsCheckin.emotionsHistory);
  const energyHistory = useSelector((state) => state.energyCheckin.energyHistory); 
  const dispatch = useDispatch();


function mapOutEmotions(){
  let emotionsMapped = [];
  let counter = 0;
  
   for(let i= 0; i<=6; i++){
    let existingEmotionDay; //moved this so it reset each day
    emotionsMapped.push(emotionsHistory.map( object => {
     if(object.date !== i){
      return null; // added this return null so that it would not return undefined for the days that did not have an emotion
    } else {
      existingEmotionDay = true;
      
      return (
        <td key={object.name} className={styles.td}>
        <img src={object.pic} alt={object.name} className={styles.emojiPic}/>
        </td>
      )}
    }));
    if(!existingEmotionDay){
      emotionsMapped.push(<td key={counter++}> </td>);
    }
  }
  return emotionsMapped
};  

function mapOutEnergy(){
  let energyMapped = [];
  let counter = 7;

  for(let i= 0; i<=6; i++){
    let existingEnergyDay;
    energyMapped.push(energyHistory.map( object => {
      if(object.date === i){
        return null; // added this return null so that it would not return undefined for the days that did not have an emotion
      } else {
        existingEnergyDay = true;       

        return (
        <td key={object.energy} className={styles.td}>
          <p className={styles.energy}>{object.energy}</p>
        </td>
      )}
    }));
    if(!existingEnergyDay){
      energyMapped.push(<td key={counter++}> </td>);
    }
  } 
    return energyMapped
  };  
  


  return (
    <>
      <table className={styles.table}>     
        <thead className={styles.thead}>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>  
        </thead>
        <tbody className={styles.tbody}>
          <tr className={styles.tr}>
            {mapOutEmotions()}
          </tr>
          <tr>
            {mapOutEnergy()}
          </tr>
        </tbody>
      </table>
      <button className={styles.button} onClick={() => dispatch(toggleCalendar())}>Close</button>
    </>
  )
}


