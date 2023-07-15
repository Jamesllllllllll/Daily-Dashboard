import { createSlice } from "@reduxjs/toolkit";

const defaultWeather = {
  current: {
    temp_f: "",
    condition: {
      text: "",
      icon: "",
    },
  },
  location: {
    name: "",
  },
};

const initialState = {
  city: "",
  weather: defaultWeather,
  defaultWeather: defaultWeather,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateWeather: (state, action) => {
      state.weather = action.payload;
    },
  },
});

export const { updateCity, updateWeather } = weatherSlice.actions;

export const citySelector = (state) => state.weather.city;
export const weatherSelector = (state) => state.weather.weather;
export const defaultWeatherSelector = (state) => state.weather.defaultWeather;

export default weatherSlice.reducer;
