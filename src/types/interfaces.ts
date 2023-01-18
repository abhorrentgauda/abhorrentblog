export interface IArticle {
  author: {
    username: string;
    bio: null | string;
    image: string;
    following: boolean;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt?: string;
}

export interface IArticles {
  articles: IArticle[];
  articlesCount: number;
}

export interface IArticleSlug {
  article: IArticle;
}

export interface IArticlesPayload {
  articles: IArticles;
  status: string | null;
  error: string | null | undefined;
  article: IArticle | null;
}
