import { createApi } from '@reduxjs/toolkit/query/react';

import { IArticles, IArticleSlug, ICreateArticle } from '../types/interfaces';

import { baseQueryWithReauth } from './userApi';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  tagTypes: ['Articles'],
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
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
  }),
});

export const { useFetchArticleQuery, useFetchArticlesQuery, useCreateArticleMutation } =
  articlesApi;
