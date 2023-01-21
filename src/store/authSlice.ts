import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthToken } from '../types/interfaces';

const initialState: IAuthToken = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<IAuthToken>) => {
      state.token = action.payload.token;
    },
    logOut: (state) => {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, logOut } = authSlice.actions;

export default authSlice.reducer;
