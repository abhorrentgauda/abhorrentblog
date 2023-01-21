import { configureStore } from '@reduxjs/toolkit';

import { articlesApi } from './articlesApi';
import { userApi } from './userApi';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware).concat(userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
