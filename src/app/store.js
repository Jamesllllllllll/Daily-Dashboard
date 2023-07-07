import { configureStore } from '@reduxjs/toolkit';
import energyCheckinReducer from '../features/energyCheckin/energyCheckinSlice';
import emotionsCheckinReducer from '../features/emotionsCheckin/emotionsCheckinSlice';
import lineChartReducer from '../features/lineChart/lineChartSlice';

export const store = configureStore({
  reducer: {
    emotionsCheckin: emotionsCheckinReducer,
    energyCheckin: energyCheckinReducer,
    lineChart: lineChartReducer,
  },
});
