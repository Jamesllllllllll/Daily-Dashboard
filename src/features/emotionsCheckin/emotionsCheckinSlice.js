import { createSlice } from '@reduxjs/toolkit';
import  emotionsArray  from './emotionsData';

export const emotionsCheckinSlice = createSlice({
  name: 'emotionsCheckin',

  initialState: {
    //emotion for the day (one per day)
    todaysEmotion: {
      name:  emotionsArray[0].name,
      pic: emotionsArray[0].pic,
    },
    //array of objects- up tp 7 days of emotions
    emotionsHistory: [{
      /*object will look like this:
       date: '',
      name: '',
      pic: '', */
    }],
  },
  
  reducers: {
    //changes the todaysEmotion state
    selectEmotion: (state, action) => {
      let newEmotion = action.payload.name;
      let newPic = action.payload.pic;
      state.todaysEmotion.name = newEmotion; 
      state.todaysEmotion.pic = newPic; 
    },
    //removes the last object from history
    removeEmotionFromHistory: (state) => {
      state.emotionsHistory.pop();
    },
    //adds today's emotion to the history array
    addToEmotionsHistory: (state, action) => {
      state.emotionsHistory.push(action.payload);
    },
  },
});


export const { selectEmotion, removeEmotionFromHistory, addToEmotionsHistory } = emotionsCheckinSlice.actions;
export default emotionsCheckinSlice.reducer;
