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

/* const storedEmotions = JSON.parse(localStorage.getItem('emotionsList')); */


function handleClick(picName, picSrc) {
  let date = new Date();
  let day = date.getDay();

  dispatch(selectEmotion(picName));
  dispatch(addToEmotionsHistory({
    date: day,
    name: picName,
    pic: picSrc,
  }));
} 


 let emojiPics = emotionsArray.map( ({name, pic}) => {
  return (
   <li key={name}> 
    <button value={name} onClick={handleClick(name, pic)}>
      <img alt={name} src={pic} />
    </button>
   </li>
  )
})
 
//I am planning on using useEffect to save the emotion selected to local Storage.

/*  useEffect(() => {
    localStorage.setItem('', JSON.stringify(''))
    console.log(storedItems);
  }, [todaysEmotion]); */
  //use date method to push to array 
  //[ { date: today, emotion: happy }, { date: ...
   

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

  
  
