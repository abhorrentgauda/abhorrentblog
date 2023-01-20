import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import { articlesApi } from './articlesApi';
import { userApi } from './userApi';

const store = configureStore({
  reducer: {
    user: userReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware).concat(userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
