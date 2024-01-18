import { createSlice, } from '@reduxjs/toolkit';

export const energyCheckinSlice = createSlice({
  name: 'energyCheckin',

  initialState: {
    //state variables:
    todaysEnergy: 50,

    sliderOpen: false,

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

    toggleSlider: (state) => {   
      state.sliderOpen ? state.sliderOpen = false : state.sliderOpen = true;
      return state
    },
  
    removeEnergyFromHistory: (state) => {
      state.energyHistory.pop();
    },

    addToHistory: (state, action) => {
      
      state.energyHistory.push(action.payload); 
    }
  },
});
  

export const { selectEnergy, removeEnergyFromHistory, addToHistory, toggleSlider } = energyCheckinSlice.actions;
export default energyCheckinSlice.reducer;