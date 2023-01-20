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

export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface IRefigsterAuth {
  username: string;
  email: string;
  password: string;
  repeatedPass: string;
  isAgreed: boolean;
}

export interface ILoginAuth {
  email: string;
  password: string;
}

export interface IEditAuth {
  username: string;
  email: string;
  password: string;
  image: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IEditProfile {
  email: string;
  password: string;
  username: string;
  bio?: string;
  image: string;
}

export interface IUserInfo {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
}

export interface IUserPayload {
  user: IUserInfo;
  error: string | null | undefined;
}

export interface IErrorAuth {
  errors: {
    body: string[];
  };
}
