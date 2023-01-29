import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { IArticle } from '../../types/interfaces';
import { useLikeArticleMutation, useUnlikeArticleMutation } from '../../store/blogApi';
import { articlesPath } from '../../paths';

import './ArticlePreview.scss';

const ArticlePreview: React.FC<IArticle> = (article) => {
  const [likeArticle] = useLikeArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();
  const { username } = useAppSelector((state) => state.auth);

  const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  };

  const handleUnlike = async (slug: string) => {
    if (username) await unlikeArticle(slug).unwrap();
  };

  const handleLike = async (slug: string) => {
    if (username) await likeArticle(slug).unwrap();
  };

  return (
    <>
      <div className="article__info--preview">
        <div className="article__header--preview">
          <Link to={`${articlesPath}/${article.slug}`} className="article__title--preview">
            {article.title}
          </Link>
          <label className="article__label--preview">
            <button
              className={
                username && !article.favorited
                  ? 'article__like--preview article__like--preview--auth'
                  : username && article.favorited
                  ? 'article__like--preview article__like--preview--liked'
                  : 'article__like--preview'
              }
              type="button"
              aria-label="like"
              onClick={
                article.favorited
                  ? () => handleUnlike(article.slug)
                  : () => handleLike(article.slug)
              }
            />
            <span>{article.favoritesCount}</span>
          </label>
        </div>
        <div className="article__tags--preview">
          {article.tagList.map((tag, index) => (
            <span key={index} className="article__tag">
              {tag}
            </span>
          ))}
        </div>
        <p className="article__paragraph--preview">{article.description}</p>
      </div>
      <div className="article__author--preview">
        <div className="article__credits--preview">
          <span className="article__name--preview">{article.author.username}</span>
          <span className="article__date--preview">
            {format(new Date(article.createdAt), 'PP')}
          </span>
        </div>
        <img src={article.author.image} onError={imageOnErrorHandler} alt="" />
      </div>
    </>
  );
};

export default ArticlePreview;
