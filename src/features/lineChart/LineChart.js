import React from 'react';
/* import { useSelector, useDispatch } from 'react-redux';
import {
  example,
  example2
} from './emotionsCheckinSlice'; */
import styles from './LineChart.module.css';


export function LineChart() {
/*     const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2'); */

  return (
    <>
      <div className={styles.container}>
        <div className={styles.lineChartContainer} >
          <button type="submit" className={styles.button} /* onClick={() => dispatch(selectEmotion)}*/>
            <img className={styles.emoticon} alt="sad" src='/media/LineChart.png' />
          </button> 
        </div>
      </div>
  </> 
  )
}
