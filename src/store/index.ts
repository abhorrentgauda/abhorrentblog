import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import { articlesApi } from './articlesApi';

const store = configureStore({
  reducer: {
    user: userReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
