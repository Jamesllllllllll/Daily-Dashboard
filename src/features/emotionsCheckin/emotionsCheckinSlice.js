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
    //array of objects- 7 days of emotions
    emotionsHistory: [{
      date: '',
      name: '',
      pic: '',
    }],
  },
  
  reducers: {
    //changes the todaysEmotion state
    selectEmotion: (state, action) => {
      let newEmotion = action.payload.name;
      let newPic = action.payload.pic;
      state.todaysEmotion.name = newEmotion; 
      state.todaysEmotion.pic = newPic; 
      return state
    },
    //adds today's emotion to the history array
    addToEmotionsHistory: (state, action) => {
      let date = new Date();
      let day = date.getDay();

      //checks that is just one emotion per day
      if (action.payload.date === day){
        state.emotionsHistory.pop();
      }

      state.emotionsHistory.push(action.payload);
    },
  },
});


export const { selectEmotion, addToEmotionsHistory } = emotionsCheckinSlice.actions;
export default emotionsCheckinSlice.reducer;
