import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  IEditProfile,
  ILoginForm,
  IRegisterForm,
  IUserInfo,
  IUserPayload,
} from '../types/interfaces';

export const getUser = createAsyncThunk<IUserInfo, string, { rejectValue: string }>(
  'user/getUser',
  async (token, { rejectWithValue }) => {
    const response = await fetch('https://blog.kata.academy/api/user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue('Server Error');
    }

    const data = response.json();
    return data;
  },
);

export const registerUser = createAsyncThunk<IUserInfo, IRegisterForm, { rejectValue: string }>(
  'user/registerUser',
  async (user, { rejectWithValue }) => {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });

    if (!response.ok) {
      return rejectWithValue('Server Error');
    }

    const data = response.json();
    return data;
  },
);

export const loginUser = createAsyncThunk<IUserInfo, ILoginForm, { rejectValue: string }>(
  'user/loginUser',
  async (user, { rejectWithValue }) => {
    const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });

    if (!response.ok) {
      return rejectWithValue('Server error!');
    }

    const data = response.json();

    return data;
  },
);

export const editUser = createAsyncThunk<IUserInfo, IEditProfile, { rejectValue: string }>(
  'user/editUser',
  async (user, { rejectWithValue }) => {
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ user }),
    });

    if (!response.ok) {
      return rejectWithValue('Server error!');
    }

    const data = response.json();

    return data;
  },
);

const initialState: IUserPayload = {
  user: {
    user: {
      username: '',
      email: '',
      token: '',
      bio: '',
      image: '',
    },
  },
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser(state) {
      state.user.user.username = '';
      state.user.user.email = '';
      state.user.user.token = '';
      state.user.user.bio = '';
      state.user.user.image = '';
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user.user.username = action.payload.user.username;
      state.user.user.email = action.payload.user.email;
      state.user.user.token = action.payload.user.token;
      state.user.user.bio = action.payload.user.bio;
      state.user.user.image = action.payload.user.image;
      localStorage.setItem('token', action.payload.user.token);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user.user.username = action.payload.user.username;
      state.user.user.email = action.payload.user.email;
      state.user.user.token = action.payload.user.token;
      state.user.user.bio = action.payload.user.bio;
      state.user.user.image = action.payload.user.image;
      localStorage.setItem('token', action.payload.user.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.user.user.username = action.payload.user.username;
      state.user.user.email = action.payload.user.email;
      state.user.user.token = action.payload.user.token;
      state.user.user.bio = action.payload.user.bio;
      state.user.user.image = action.payload.user.image;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user.user.username = action.payload.user.username;
      state.user.user.email = action.payload.user.email;
      state.user.user.token = action.payload.user.token;
      state.user.user.bio = action.payload.user.bio;
      state.user.user.image = action.payload.user.image;
      localStorage.setItem('token', action.payload.user.token);
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { removeUser } = userSlice.actions;

export default userSlice.reducer;
