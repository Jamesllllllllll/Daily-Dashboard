import { createSlice } from '@reduxjs/toolkit';


export const emotionsCheckinSlice = createSlice({
  name: 'emotionsCheckin',
  initialState: {
    todaysEmotion: '',
    todaysEmotionPic: '',
    emotionsHistory: [],
  },
  
  reducers: {
    selectEmotion: (state, action) => {
      state.todaysEmotion = action.paylopad;
    },
    addToEmotionsHistory: (state, action) => {
      state.emotionsHistory.push(action.payload);
    },
  },
  
});

export const { selectEmotion, addToEmotionsHistory } = emotionsCheckinSlice.actions;
export default emotionsCheckinSlice.reducer;