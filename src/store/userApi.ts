import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { IUserInfo, IRegisterForm, ILoginForm, IEditProfile } from '../types/interfaces';

import { setToken, logOut } from './authSlice';

import { RootState } from '.';

// ищем токен в стейте, если находим - устанавливаем в стейте
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://blog.kata.academy/api/',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;

    if (token) {
      headers.set('Authorization', `Token ${token}`);
    }

    return headers;
  },
});

// если токена нет в стейте, ищем его в локасторедж повторно
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = localStorage.getItem('token');

    if (refreshResult) {
      api.dispatch(setToken({ token: refreshResult }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],

  endpoints: (builder) => ({
    getUser: builder.query<IUserInfo, void>({
      query: () => ({
        url: 'user',
      }),
      providesTags: ['User'],
    }),

    registerUser: builder.mutation<IUserInfo, IRegisterForm>({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: { user },
      }),
      invalidatesTags: ['User'],
    }),

    loginUser: builder.mutation<IUserInfo, ILoginForm>({
      query: (user) => ({
        url: 'users/login',
        method: 'POST',
        body: { user },
      }),
      invalidatesTags: ['User'],
    }),

    editUser: builder.mutation<IUserInfo, IEditProfile>({
      query: (user) => ({
        url: 'user',
        method: 'PUT',
        body: { user },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useEditUserMutation,
} = userApi;
