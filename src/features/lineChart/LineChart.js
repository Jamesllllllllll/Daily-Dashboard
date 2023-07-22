import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShowHistory } from '../../components/ShowHistory/ShowHistory';
import {
  toggleLineChart
} from './lineChartSlice'; 
import styles from './LineChart.module.css';


export function LineChart() {
  const lineChart = useSelector((state) => state.lineChart.lineChartOpen);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.lineChartContainer}>
          {lineChart === true ? <ShowHistory  /> : 
          <button type="submit" className={styles.button}  onClick={() => dispatch(toggleLineChart())}>
            <img className={styles.emoticon} alt="line-chart" src='/media/LineChart.png' />
          </button> }
        </div>
      </div>
    </> 
  );
}
