import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCalendar } from '../../features/calendar/calendarSlice';
import styles from './ShowHistory.module.css';
import { Button } from '@mui/material';

export function ShowHistory() {
  const emotionsHistory = useSelector(
    (state) => state.emotionsCheckin.emotionsHistory
  );
  const energyHistory = useSelector(
    (state) => state.energyCheckin.energyHistory
  );
  const dispatch = useDispatch();

  function mapOutEmotions() {
    let emotionsMapped = [];
    let counter = 0;

    for (let i = 0; i <= 6; i++) {
      let existingDay; //moved this so it reset each day
      emotionsMapped.push(
        emotionsHistory.map((object) => {
          if (object.date !== i) {
            return null; // added this return null so that it would not return undefined for the days that did not have an emotion
          } else {
            existingDay = true;

            return (
              <td key={object.name} className={styles.td}>
                <img
                  src={object.pic}
                  alt={object.name}
                  className={styles.emojiPic}
                />
              </td>
            );
          }
        })
      );
      if (!existingDay) {
        emotionsMapped.push(<td key={counter++}> </td>);
      }
    }
    return emotionsMapped;
  }

function mapOutEnergy(){
  let energyMapped = [];
  let counter = 7;

    for (let i = 0; i <= 6; i++) {
      let existingDay;
      energyMapped.push(
        energyHistory.map((object) => {
          if (object.date !== i) {
            return null; // added this return null so that it would not return undefined for the days that did not have an emotion
          } else {
            existingDay = true;

            return (
              <td key={object.energy} className={styles.td}>
                <p className={styles.energy}>{object.energy}</p>
              </td>
            );
          }
        })
      );
      if (!existingDay) {
        energyMapped.push(<td key={counter++}> </td>);
      }
    }
    return energyMapped;
  }

  console.log(energyHistory)

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          <tr className={styles.tr}>{mapOutEmotions()}</tr>
          <tr>{mapOutEnergy()}</tr>
        </tbody>
      </table>
      <Button
        onClick={() => dispatch(toggleCalendar())}
      >
        Close
      </Button>
    </>
  );
}
