import { configureStore } from '@reduxjs/toolkit';

import articleReducer from './articleSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    articles: articleReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
