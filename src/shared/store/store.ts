import { configureStore } from '@reduxjs/toolkit';
import { playersReducer } from './players';

const store = configureStore({
  reducer: playersReducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
