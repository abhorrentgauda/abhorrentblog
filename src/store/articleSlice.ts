import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IArticleSlug, IArticles, IArticlesPayload } from '../types/interfaces';

const initialState: IArticlesPayload = {
  articles: { articles: [], articlesCount: 0 },
  status: null,
  error: null,
  article: null,
};

export const fetchArticles = createAsyncThunk<IArticles, number, { rejectValue: string }>(
  'articles/fetchArticles',
  async (offset, { rejectWithValue }) => {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`);

    if (!response.ok) {
      return rejectWithValue('Server error!');
    }
    const data = await response.json();
    return data;
  },
);

export const fetchArticle = createAsyncThunk<IArticleSlug, string, { rejectValue: string }>(
  'articles/fetchArticle',
  async (slug, { rejectWithValue }) => {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);

    if (!response.ok) {
      return rejectWithValue('Server error!');
    }
    const data = await response.json();
    return data;
  },
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles.articles = action.payload.articles;
      state.articles.articlesCount = action.payload.articlesCount;
      state.status = 'resolved';
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'rejected';
    });
    builder.addCase(fetchArticle.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.article = action.payload.article;
      state.status = 'resolved';
    });
    builder.addCase(fetchArticle.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'rejected';
    });
  },
});

export default articleSlice.reducer;
