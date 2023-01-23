import { useEffect, useState } from 'react';
import { Pagination, Spin } from 'antd';

import ArticlePreview from '../ArticlePreview/ArticlePreview';
import { useFetchArticlesQuery, useLazyFetchArticlesQuery } from '../../store/blogApi';
import { useAppSelector } from '../../hooks';

import './ArticleList.scss';

function ArticleList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const { token } = useAppSelector((state) => state.auth);

  const { data, isLoading, error } = useFetchArticlesQuery(offset);
  const [fetchArticles] = useLazyFetchArticlesQuery();

  useEffect(() => {
    fetchArticles(offset);
  }, [token]);

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
        hideOnSinglePage
      />
    </div>
  );
}

export default ArticleList;
