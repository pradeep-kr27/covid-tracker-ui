import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import statsReducer from '../features/homePage/statsSlice'

export const store = configureStore({
  reducer: {
    stats: statsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
