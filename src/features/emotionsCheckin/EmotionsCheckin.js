import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectEmotion,
} from './emotionsCheckinSlice';
import emotionsArray  from './emotionsData';


import styles from './EmotionsCheckin.module.css';

//This component returns the UI for the emojis section (only).
export function EmotionsCheckin() {
  
const emotion = useSelector(state => state.emotionsCheckin.todaysEmotion);
const emotionPic = useSelector(state => state.emotionsCheckin.todaysEmotionPic);
const dispatch = useDispatch();
const storedEmotions = JSON.parse(localStorage.getItem('emotion'));

const emojiPics = emotionsArray.map( ({name, pic}) => {
  return (
   <li> 
    <button type="submit" className={styles.button} onClick={() => dispatch(selectEmotion)}>
      <img className={styles.emoji} alt={name} src={pic}/>
    </button>
   </li>
  )
});


//I am planning on using useEffect to save the emotion selected to local Storage.

/*   useEffect(() => {
    localStorage.setItem('', JSON.stringify(''))
    console.log(storedItems);
  }, [todaysEmotion]); */
  //use date method to push to array 
  //[ { date: today, emotion: happy }, { date: ...
/*   console.log(emotionsArray[0].pic) */

  return (
    <>
      <div className={styles.container}>
        <div className={styles.emotionsContainer} >
          <ul className={styles.list}>
            {emojiPics}
          </ul>
        </div>
      </div>
     
    </>  
  );
}
