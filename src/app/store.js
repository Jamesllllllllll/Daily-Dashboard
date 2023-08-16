import { configureStore, combineReducers } from '@reduxjs/toolkit';

import energyCheckinReducer from '../features/energyCheckin/energyCheckinSlice';
import emotionsCheckinReducer from '../features/emotionsCheckin/emotionsCheckinSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import notesReducer from '../features/notes/notesSlice';
import weatherReducer from '../features/weather/weatherSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

// Default storage is localstorage - alternatives would be sessionStorage and cookies

const rootReducer = combineReducers({
  emotionsCheckin: emotionsCheckinReducer,
  energyCheckin: energyCheckinReducer,
  calendar: calendarReducer,
  notes: notesReducer,
  weather: weatherReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

// middleware: [thunk]  stops "non-serialized data" before it goes into state in the Redux store
// eg. a reference to a function, or anything that isn't a string of data

export const persistor = persistStore(store);