import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IUserInfo, IRegisterForm } from '../types/interfaces';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://blog.kata.academy/api/',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('Authorization', `Token ${token}`);
    }

    return headers;
  },
});

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<IUserInfo, void>({
      query: () => 'user',
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
  }),
});

export const { useGetUserQuery, useRegisterUserMutation } = userApi;
