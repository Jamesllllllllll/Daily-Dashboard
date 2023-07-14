import { createSlice } from '@reduxjs/toolkit';
import  emotionsArray  from './emotionsData';

export const emotionsCheckinSlice = createSlice({
  name: 'emotionsCheckin',

  initialState: {
    todaysEmotion: {
      name:  emotionsArray[0].name,
      pic: emotionsArray[0].pic,
    },
    emotionsHistory: [{
      date: '',
      name: '',
      pic: '',
    }],
  },
  
  reducers: {
    selectEmotion: (state, action) => {
      let newEmotion = action.payload.name;
      let newPic = action.payload.pic;
      state.todaysEmotion.name = newEmotion; 
      state.todaysEmotion.pic = newPic; 
      return state
    },
    addToEmotionsHistory: (state, action) => {
      let date = new Date();
      let day = date.getDay();

      if (action.payload.date === day){
        state.emotionsHistory.pop();
      }

      state.emotionsHistory.push(action.payload);
    },
  },
  extraReducers:() => {

  }
  
});


export const { selectEmotion, addToEmotionsHistory } = emotionsCheckinSlice.actions;
export default emotionsCheckinSlice.reducer;
