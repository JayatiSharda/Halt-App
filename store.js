import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import quotesReducer from './reducers/quotesReducer';
import emotionsReducer, { emotionsSlice } from './reducers/emotionsReducer';
import activitiesReducer from './reducers/activitiesReducer';
import soundReducer from './reducers/soundReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    quotes: quotesReducer,
    emotions: emotionsReducer,
    activities: activitiesReducer,
    sound: soundReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
})