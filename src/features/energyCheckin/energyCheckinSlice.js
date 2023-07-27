import { createSlice, } from '@reduxjs/toolkit';

export const energyCheckinSlice = createSlice({
  name: 'energyCheckin',

  initialState: {
    //state variables:
    todaysEnergy: 50,

    energyHistory: [{
     /*  object will look like this:
      date: '',
      energy: '', */
    }],
  },
  reducers: {
    selectEnergy: (state, action) => {   
      state.todaysEnergy = action.payload; 
    },
  
    removeEnergyFromHistory: (state) => {
      state.energyHistory.pop();
    },

    addToHistory: (state, action) => {
      
      state.energyHistory.push(action.payload); 
    }
  },
});
  

export const { selectEnergy, removeEnergyFromHistory, addToHistory } = energyCheckinSlice.actions;
export default energyCheckinSlice.reducer;