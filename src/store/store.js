import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../store/contactSlice';
import messageReducer from '../store/messageSlice';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    message: messageReducer,
  },
});
