import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleCalendar
} from '../../features/calendar/calendarSlice'; 
import styles from './ShowHistory.module.css'


export function ShowHistory() {
  const emotionsHistory = useSelector((state) => state.emotionsCheckin.emotionsHistory);
  const energyHistory = useSelector((state) => state.energyCheckin.energyHistory); 
  const dispatch = useDispatch();


function mapOutEmotions(){
  let emotionsMapped = [];
  let counter = 0;
  let existingDay;
  
   for(let i= 0; i<=6; i++){
    existingDay=false;
    emotionsMapped.push(emotionsHistory.map( object => {
     if(object.date == i){
      console.log(i, object.date, object.energy,"if");
      existingDay = true;
      return (
       <td key={object.name} className={styles.td}>
        <img src={object.pic} className={styles.emojiPic}/>
       </td>
     )} 
    }));
    if(!existingDay){
      console.log(i,"no if");
      emotionsMapped.push(<td key={counter++}> </td>);
    }
  } 
    return emotionsMapped
  };  

  
  function mapOutEnergy(){
    let energyMapped = [];
    let counter = 8;
    let existingDay;
  
    for(let i= 0; i<=6; i++){
      existingDay=false;
      energyMapped.push(energyHistory.map( object => {
        if(object.date == i){
          console.log(i, object.date, object.energy,"if");
          existingDay = true;

          return (
          <td key={object.energy} className={styles.td}>
            <img  className={styles.energyPic} src={'./media/Lightning.png'}/>
            <p>{object.energy}</p>
          </td>
        )}
      }));
      if(!existingDay){
        console.log(i,"no if");
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
      <button className={styles.button} onClick={() => dispatch(toggleCalendar())}>CLOSE</button>
    </>
  )
}


