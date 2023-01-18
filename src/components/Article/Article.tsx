import './Article.scss';

import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';

import { fetchArticle } from '../../store/articleSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article } = useAppSelector((state) => state.articles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof slug === 'string') dispatch(fetchArticle(slug));
  }, []);
  return (
    article && (
      <div className="article-list">
        <div className="article">
          <div className="article__info">
            <div className="article__header">
              <p className="article__title">{article.title}</p>
              <label className="article__label">
                <button className="article__like" type="button" aria-label="like" />
                <span>{article.favoritesCount}</span>
              </label>
            </div>
            <div className="article__tags">
              {article.tagList.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
            <p className="article__paragraph">{article.description}</p>
            <div className="article__body">
              <Markdown>{article.body}</Markdown>
            </div>
          </div>
          <div className="article__author">
            <div className="article__credits">
              <span className="article__name">{article.author.username}</span>
              <span className="article__date">{format(new Date(article.createdAt), 'PP')}</span>
            </div>
            <img src={article.author.image} alt="" />
          </div>
        </div>
      </div>
    )
  );
};

export default Article;
