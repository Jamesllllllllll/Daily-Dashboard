import { createSlice } from '@reduxjs/toolkit';


export const calendarSlice = createSlice({
  name: 'calendar',

  initialState: {
    //state variables:
    calendarOpen: false,
  },

  reducers: {
    toggleCalendar: (state) => {   
      state.calendarOpen ? state.calendarOpen = false : state.calendarOpen = true;
      return state
    },
  },
  
}); 

export const { toggleCalendar, } = calendarSlice.actions;
export default calendarSlice.reducer;