import './ArticleList.scss';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchArticles } from '../../store/articleSlice';
import ArticleDescription from '../ArticleDescription';

function ArticleList() {
  const { articles, articlesCount } = useAppSelector((state) => state.articles.articles);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();

  const onChangePage = (e: number) => {
    dispatch(fetchArticles(e * 5 - 5));
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(fetchArticles(0));
  }, [dispatch]);

  const articleList = articles.map((article, index) => (
    <div className="article-preview" key={index + 1}>
      <ArticleDescription
        author={article.author}
        body={article.body}
        createdAt={article.createdAt}
        description={article.description}
        slug={article.slug}
        tagList={article.tagList}
        favorited={article.favorited}
        favoritesCount={article.favoritesCount}
        title={article.title}
      />
    </div>
  ));
  return (
    <div className="article-list">
      {articleList}
      <Pagination
        current={currentPage}
        total={articlesCount}
        onChange={onChangePage}
        showSizeChanger={false}
        size="small"
        pageSize={5}
      />
    </div>
  );
}

export default ArticleList;
