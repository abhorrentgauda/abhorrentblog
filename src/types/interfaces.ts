export interface IArticle {
  author: {
    username: string;
    image: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
}

export interface IArticles {
  articles: IArticle[];
  articlesCount: number;
}

export interface IArticleSlug {
  article: IArticle;
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

export interface IEditProfile {
  username: string;
  email: string;
  password: string;
  image: string;
}

export interface ILoginForm {
  email: string;
  password: string;
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

export interface IAuthToken {
  token: string;
}

export interface ICreateArticleForm {
  title: string;
  description: string;
  body: string;
  tags: {
    tag: string;
  }[];
}

export interface ICreateArticle {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
