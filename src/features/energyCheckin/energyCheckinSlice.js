import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todaysEnergy: 0,
};


export const energyCheckinSlice = createSlice({
  name: 'energyCheckin',
  initialState,
  reducers: {
    updateEnergy: (state, action) => {
      state.todaysEnergy += action.payload;
    },
  }
});
  


export const { updateEnergy, } = energyCheckinSlice.actions;


export default energyCheckinSlice.reducer;