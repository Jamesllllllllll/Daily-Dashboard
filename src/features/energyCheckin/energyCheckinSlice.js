import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/* let slider = document.getElementById("energy-slider");
let sliderValue = slider.value; */

//Thunk Functions 
export const fetchEnergy = createAsyncThunk(
  'energyCheckin/fetchEnergy', 
  async () => {
    const en = await fetch(sliderValue).then(
    (data) => data.json()
  )
  return en
});

/* export const saveEnergy = createAsyncThunk('energyCheckin/saveEnergy', async (value) => {
  const addEnergy = await client.post('/fakeApi/todos', { })

}); */



export const energyCheckinSlice = createSlice({
  name: 'energyCheckin',

  initialState: {
    energy: 50,
  },
  reducers: {
  
  },
  extraReducers: builder => {
    builder.addCase(fetchEnergy.pending, (state) => {
        state.energy = 50;
      })
      .addCase(fetchEnergy.fulfilled, (state, action) => {
        const todaysEnergy = action.payload;
        state.energy = todaysEnergy;
      })
      .addCase(fetchEnergy.rejected, (state, action ) => {
        state.energy = action.payload;
      })
  }
});
  

export default energyCheckinSlice.reducer;