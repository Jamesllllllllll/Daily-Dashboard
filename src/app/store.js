import { configureStore } from '@reduxjs/toolkit';
import energyCheckinReducer from '../features/energyCheckin/energyCheckinSlice';
import emotionsCheckinReducer from '../features/emotionsCheckin/emotionsCheckinSlice';
import lineChartReducer from '../features/lineChart/lineChartSlice';
import notesReducer from '../features/notes/notesSlice';
import weatherReducer from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    emotionsCheckin: emotionsCheckinReducer,
    energyCheckin: energyCheckinReducer,
    lineChart: lineChartReducer,
    notes: notesReducer,
    weather: weatherReducer,
  },
});
