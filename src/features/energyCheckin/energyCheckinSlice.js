import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//How do I get the slider value???
let slider = document.getElementById("energy-slider");
let sliderValue;

//Thunk Functions:
/*
I am thinking I need two async functions...one to update the energy state
and the other one to add the state to the history array (and save to local Storage?);
*/
export const fetchEnergy = createAsyncThunk(
  'energyCheckin/fetchEnergy', 
  async () => {
    const energy = await fetch(sliderValue).then(
    (data) => data.json()
  )
  return energy
});

export const saveEnergy = createAsyncThunk('energyCheckin/saveEnergy', async (value) => {
 
});



export const energyCheckinSlice = createSlice({
  //name of Slice
  name: 'energyCheckin',

  initialState: {
    //My only state variable for the energy component
    energy: 50,
  },
  reducers: {
    //I do not think I need regular reducers, just the async ones declared on extra reducers below:
  },
  extraReducers: builder => {
    //As I understand, I need to add a case for each of the stages: pending, fulfilled and rejected.
    //In each case I write the actions (logic) for each stage


    builder.addCase(fetchEnergy.pending, (state) => {
        state.energy = state.initialState;
      })
      /*I want to update the energy state value here with whatever value
        the user drops the slider at.
      */

      .addCase(fetchEnergy.fulfilled, (state, action) => {
        const todaysEnergy = action.payload;
        state.energy = todaysEnergy;
      })
      //Should I return an error? Can it be a string error message instead of a number as the state?
      .addCase(fetchEnergy.rejected, (state, action ) => {
        state.energy = action.payload;
      })
  }
});
  

export default energyCheckinSlice.reducer;