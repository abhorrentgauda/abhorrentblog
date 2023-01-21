import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IArticles, IArticleSlug } from '../types/interfaces';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  tagTypes: ['Articles'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    fetchArticles: builder.query<IArticles, number>({
      query: (offset) => `articles?limit=5&offset=${offset}`,
      providesTags: ['Articles'],
    }),
    fetchArticle: builder.query<IArticleSlug, string>({
      query: (slug) => `articles/${slug}`,
      providesTags: ['Articles'],
    }),
  }),
});

export const { useFetchArticleQuery, useFetchArticlesQuery } = articlesApi;
