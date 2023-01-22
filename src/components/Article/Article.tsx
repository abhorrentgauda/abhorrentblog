import Markdown from 'markdown-to-jsx';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Spin } from 'antd';

import { useFetchArticleQuery } from '../../store/articlesApi';
import { isFetchBaseQueryError } from '../../helpers/errorHelper';

import './Article.scss';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useFetchArticleQuery(slug || '');

  const notFoundMessage = isFetchBaseQueryError(error) && error.data === 'Not Found' && (
    <p className="error--not-found">404 NOT FOUND</p>
  );

  const content = data && (
    <div className="article">
      <div className="article__preview">
        <div className="article__info">
          <div className="article__header">
            <p className="article__title">{data.article.title}</p>
            <label className="article__label">
              <button className="article__like" type="button" aria-label="like" />
              <span>{data.article.favoritesCount}</span>
            </label>
          </div>
          <div className="article__tags">
            {data.article.tagList.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
          <p className="article__paragraph">{data.article.description}</p>
        </div>
        <div className="article__author">
          <div className="article__credits">
            <span className="article__name">{data.article.author.username}</span>
            <span className="article__date">{format(new Date(data.article.createdAt), 'PP')}</span>
          </div>
          <img src={data.article.author.image} alt="" />
        </div>
      </div>
      <div className="article__body">
        <Markdown>{data.article.body}</Markdown>
      </div>
    </div>
  );
  return (
    <div className="container">
      {content}
      {isLoading && <Spin size="large" />}
      {notFoundMessage}
    </div>
  );
};

export default Article;
