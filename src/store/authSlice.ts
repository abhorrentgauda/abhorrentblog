import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthUser } from '../types/interfaces';

const initialState: IAuthUser = {
  token: '',
  username: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthUser>) => {
      state.token = action.payload.token;
      if (action.payload.username) state.username = action.payload.username;
      localStorage.setItem('token', action.payload.token);
    },
    logOut: (state) => {
      state.token = '';
      state.username = '';
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
