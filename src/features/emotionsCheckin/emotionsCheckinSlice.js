import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  emotionsArray  from './emotionsData';

/* const addEmotionToHistory = createAsyncThunk(
  'emotionsCheckin/addEmotion',
  async (userId: number, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
) */

const temporaryPic = emotionsArray[0].pic;

export const emotionsCheckinSlice = createSlice({
  name: 'emotionsCheckin',

  initialState: {
    todaysEmotion: {
      name: 'happy',
      pic: temporaryPic,
    },
    emotionsHistory: [{
      date: '',
      name: '',
      pic: '',
    }],
  },
  
  reducers: {
    selectEmotion: (state, action) => {
      const newEmotion = action.payload;
      state.todaysEmotion.name = newEmotion;
      
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
