import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShowHistory } from '../../components/ShowHistory/ShowHistory';
import {
  toggleCalendar
} from './calendarSlice'; 
import styles from './Calendar.module.css';


export default function Calendar() {
  const lineChart = useSelector((state) => state.calendar.calendarOpen);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.calendarContainer}>
          {lineChart === true ? <ShowHistory  /> : 
          <button type="submit" className={styles.calendarButton}  onClick={() => dispatch(toggleCalendar())}>
            <img className={styles.img} alt="calendar" src='/media/Calendar.png' />
          </button> }
      </div>
    </> 
  );
}
