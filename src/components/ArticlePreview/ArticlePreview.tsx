import './ArticlePreview.scss';
import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { IArticle } from '../../types/interfaces';

const ArticlePreview: React.FC<IArticle> = ({
  author,
  createdAt,
  description,
  // favorited,
  favoritesCount,
  slug,
  tagList,
  title,
}) => (
  <>
    <div className="article__info--preview">
      <div className="article__header--preview">
        <Link to={`articles/${slug}`} className="article__title--preview">
          {title}
        </Link>
        <label className="article__label--preview">
          <button className="article__like--preview" type="button" aria-label="like" />
          <span>{favoritesCount}</span>
        </label>
      </div>
      <div className="article__tags--preview">
        {tagList.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
      <p className="article__paragraph--preview">{description}</p>
    </div>
    <div className="article__author--preview">
      <div className="article__credits--preview">
        <span className="article__name--preview">{author.username}</span>
        <span className="article__date--preview">{format(new Date(createdAt), 'PP')}</span>
      </div>
      <img src={author.image} alt="" />
    </div>
  </>
);

export default ArticlePreview;
