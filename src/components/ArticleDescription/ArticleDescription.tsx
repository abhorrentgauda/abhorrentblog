import './ArticleDescription.scss';
import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { IArticle } from '../../types/interfaces';

const ArticleDescription: React.FC<IArticle> = ({
  author,
  // body,
  createdAt,
  description,
  // favorited,
  favoritesCount,
  // slug,
  tagList,
  title,
}) => (
  <>
    <div className="article__info">
      <div className="article__header">
        <Link to="/article/" className="article__title">
          {title}
        </Link>
        <label className="article__label">
          <button className="article__like" type="button" aria-label="like" />
          <span>{favoritesCount}</span>
        </label>
      </div>
      <div className="article__tags">
        {tagList.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
      <p className="article__paragraph">{description}</p>
      {/* <div className="article__body">
        <ReactMarkdown>{body}</ReactMarkdown>
      </div> */}
    </div>
    <div className="article__author">
      <div className="article__credits">
        <span className="article__name">{author.username}</span>
        <span className="article__date">{format(new Date(createdAt), 'PP')}</span>
      </div>
      <img src={author.image} alt="" />
    </div>
  </>
);

export default ArticleDescription;
