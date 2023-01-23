import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { IArticle } from '../../types/interfaces';
import { useLikeArticleMutation, useUnlikeArticleMutation } from '../../store/blogApi';

import './ArticlePreview.scss';

const ArticlePreview: React.FC<IArticle> = (article) => {
  const [likeArticle] = useLikeArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();

  const handleUnlike = async (slug: string) => {
    await unlikeArticle(slug).unwrap();
  };

  const handleLike = async (slug: string) => {
    await likeArticle(slug).unwrap();
  };

  return (
    <>
      <div className="article__info--preview">
        <div className="article__header--preview">
          <Link to={`articles/${article.slug}`} className="article__title--preview">
            {article.title}
          </Link>
          <label className="article__label--preview">
            <button
              className={
                !article.favorited
                  ? 'article__like--preview'
                  : 'article__like-preview article__like--preview--liked'
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
        <img src={article.author.image} alt="" />
      </div>
    </>
  );
};

export default ArticlePreview;
