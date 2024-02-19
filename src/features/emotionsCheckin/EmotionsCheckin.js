import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectEmotion,
  removeEmotionFromHistory,
  addToEmotionsHistory,
} from './emotionsCheckinSlice';
import emotionsArray from './emotionsData';

import styles from './EmotionsCheckin.module.css';

//This component returns the UI for the emojis section.
export default function EmotionsCheckin() {
  //state variables:
  const emotionName = useSelector(
    (state) => state.emotionsCheckin.todaysEmotion.name
  );
  const emotionPic = useSelector(
    (state) => state.emotionsCheckin.todaysEmotion.pic
  );
  const latestDateStored = useSelector(
    (state) => state.emotionsCheckin.emotionsHistory.at(-1).date
  );

  const dispatch = useDispatch();

  const [selectOpen, setSelectOpen] = useState(false);

  //handleClick dispatches actions
  //target is button
  function handleClick(e) {
    let date = new Date();
    let today = date.getDay();
    const picName = e.target.name;
    const picSrc = e.target.src;
    setSelectOpen(!selectOpen)
    dispatch(
      selectEmotion({
        name: picName,
        pic: picSrc,
      })
    );

    if (today === latestDateStored) {
      dispatch(removeEmotionFromHistory());
    }

    dispatch(
      addToEmotionsHistory({
        date: today,
        name: picName,
        pic: picSrc,
      })
    );
  }

  //emojiPics is an array of emoji buttons
  let emojiPics = emotionsArray.map(({ name, pic }) => {
    return (
      <li key={name}>
        <button
          value={name}
          className={`${styles.button} ${styles.listButton}`}
        >
          <img
            alt={name}
            name={name}
            src={pic}
            onClick={handleClick}
            className={styles.img}
          />
        </button>
      </li>
    );
  });

  return (
    <>
      <div 
        className={styles.container}
        data-testid="emotionsCheckin">
        <div className={styles.emotionsContainer}>
          <button className={styles.button} onClick={() => setSelectOpen(!selectOpen)}>
            <img
              src={emotionPic}
              alt={emotionName}
              className={styles.emojiPic}
            />
          </button>
          {selectOpen && <ul className={styles.list}>{emojiPics}</ul>}
        </div>
  );
}
