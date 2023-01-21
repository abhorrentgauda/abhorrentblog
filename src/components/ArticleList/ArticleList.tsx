import { useState } from 'react';
import { Pagination, Spin } from 'antd';

import ArticlePreview from '../ArticlePreview/ArticlePreview';
import { useFetchArticlesQuery } from '../../store/articlesApi';

import './ArticleList.scss';

function ArticleList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const { data, isLoading, error } = useFetchArticlesQuery(offset);

  const onChangePage = (e: number) => {
    setOffset(e * 5 - 5);
    setCurrentPage(e);
  };

  const articleList =
    data?.articles &&
    data.articles.map((article, index) => (
      <div className="article-preview" key={index + 1}>
        <ArticlePreview {...article} />
      </div>
    ));

  return (
    <div className="article-list">
      {articleList}
      {isLoading && <Spin size="large" />}
      {error && <p>error</p>}
      <Pagination
        current={currentPage}
        total={data?.articlesCount}
        onChange={onChangePage}
        showSizeChanger={false}
        size="small"
        pageSize={5}
      />
    </div>
  );
}

export default ArticleList;
