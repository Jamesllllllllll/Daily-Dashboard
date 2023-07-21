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
    removeFromHistory: (state) => {
      state.energyHistory.pop();
    },

    addToHistory: (state, action) => {
      
      state.energyHistory.push(action.payload); 
    }
  },
});
  

export const { selectEnergy, removeFromHistory, addToHistory } = energyCheckinSlice.actions;
export default energyCheckinSlice.reducer;