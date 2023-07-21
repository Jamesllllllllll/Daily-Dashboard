import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeCity: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.changeCity = action.payload;
    },
  },
});

export const { changeCity } = settingsSlice.actions;

export const changeCitySelector = (state) => state.settings.changeCity;

export default settingsSlice.reducer;
