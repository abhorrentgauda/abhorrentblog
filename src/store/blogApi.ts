import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {
  IUserInfo,
  IRegisterForm,
  ILoginForm,
  IEditProfile,
  IArticles,
  IArticleSlug,
  ICreateArticle,
  IEditArticle,
} from '../types/interfaces';

import { setUser, logOut } from './authSlice';

import { RootState } from '.';

// ищем токен в стейте, если находим - устанавливаем из стейта
export const baseQuery = fetchBaseQuery({
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
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = localStorage.getItem('token');

    if (refreshResult) {
      api.dispatch(setUser({ token: refreshResult }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const blogApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Articles'],

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

    fetchArticles: builder.query<IArticles, number>({
      query: (offset) => ({
        url: `articles?limit=5&offset=${offset}`,
      }),
      providesTags: ['Articles'],
    }),

    fetchArticle: builder.query<IArticleSlug, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
      }),
      providesTags: ['Articles'],
    }),

    createArticle: builder.mutation<IArticleSlug, ICreateArticle>({
      query: (article) => ({
        url: 'articles',
        method: 'POST',
        body: { article },
      }),
      invalidatesTags: ['Articles'],
    }),

    deleteArticle: builder.mutation<void, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'],
    }),

    editArticle: builder.mutation<IArticleSlug, IEditArticle>({
      query: ({ article, slug }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        body: { article },
      }),
      invalidatesTags: ['Articles'],
    }),

    likeArticle: builder.mutation<IArticleSlug, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Articles'],
    }),

    unlikeArticle: builder.mutation<IArticleSlug, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useEditUserMutation,
  useFetchArticleQuery,
  useFetchArticlesQuery,
  useLazyFetchArticlesQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useEditArticleMutation,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} = blogApi;
