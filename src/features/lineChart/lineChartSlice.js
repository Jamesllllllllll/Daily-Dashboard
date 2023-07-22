import { createSlice } from '@reduxjs/toolkit';


export const lineChartSlice = createSlice({
  name: 'lineChart',

  initialState: {
    //state variables:
    lineChartOpen: false,
  },

  reducers: {
    toggleLineChart: (state) => {   
      state.lineChartOpen ? state.lineChartOpen = false : state.lineChartOpen = true;
      return state
    },
  },
  
}); 

export const { toggleLineChart, } = lineChartSlice.actions;
export default lineChartSlice.reducer;