import { createSlice, } from '@reduxjs/toolkit';

export const energyCheckinSlice = createSlice({
  name: 'energyCheckin',

  initialState: {
    //state variables:
    todaysEnergy: 50,

    energyHistory: [{
      date: '',
      energy: '',
    }],
  },
  reducers: {
    selectEnergy: (state, action) => {   
      state.todaysEnergy = action.payload; 
    },
    addToHistory: (state, action) => {
      let date = new Date();
      let day = date.getDay();

       if (action.payload.date === day){
        state.energyHistory.pop();
      }
 
      state.energyHistory.push(action.payload); 
    },
  }
});
  

export const { selectEnergy, addToHistory } = energyCheckinSlice.actions;
export default energyCheckinSlice.reducer;