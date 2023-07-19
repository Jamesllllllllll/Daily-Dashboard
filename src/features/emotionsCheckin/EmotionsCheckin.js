import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectEmotion,
  addToEmotionsHistory,
} from './emotionsCheckinSlice';
import emotionsArray  from './emotionsData';

import styles from './EmotionsCheckin.module.css';

//This component returns the UI for the emojis section.
export function EmotionsCheckin() {
  
const emotionName = useSelector((state) => state.emotionsCheckin.todaysEmotion.name);
const emotionPic = useSelector((state) => state.emotionsCheckin.todaysEmotion.pic);
//const emotionsHistory = useSelector((state) => state.emotionsCheckin.emotionsHistory);
const dispatch = useDispatch();

//handleClick dispatches actions
//target is button
function handleClick(e) {
  let date = new Date();
  let day = date.getDay();
  const picName = e.target.name;
  const picSrc = e.target.src;
  console.log(picName)

  dispatch(selectEmotion({
    name: picName,
    pic: picSrc,
  }));

  dispatch(addToEmotionsHistory({
    date: day,
    name: picName,
    pic: picSrc,
  }));
} 

//emojiPics is an array of emoji buttons
let emojiPics = emotionsArray.map( ({name, pic}) => {
  return (
   <li key={name}> 
    <button value={name} onClick={handleClick} className={styles.button}>
      <img alt={name} name={name} src={pic} className={styles.img} />
    </button>
   </li>
  )
})
 
   
  return (
    <>
      <div className={styles.container}>
        <div className={styles.emotionsContainer}>
          <ul className={styles.list}>
            {emojiPics}
          </ul>
            <button className={styles.openingEmoji}><img src={emotionPic} alt={emotionName}/></button>
        </div>
      </div>
     
    </>  
  );
}

  
  
