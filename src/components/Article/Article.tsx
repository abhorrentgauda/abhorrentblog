import Markdown from 'markdown-to-jsx';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Spin, Popconfirm } from 'antd';

import { useAppSelector } from '../../hooks';
import {
  useDeleteArticleMutation,
  useFetchArticleQuery,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} from '../../store/blogApi';
import { isFetchBaseQueryError } from '../../helpers/errorHelper';

import './Article.scss';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useFetchArticleQuery(slug || '');
  const [deleteArticle] = useDeleteArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();
  const [likeArticle] = useLikeArticleMutation();
  const { username } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (slug) await deleteArticle(slug).unwrap();
    navigate('/');
  };

  const handleUnlike = async (slug: string) => {
    await unlikeArticle(slug).unwrap();
  };

  const handleLike = async (slug: string) => {
    await likeArticle(slug).unwrap();
  };

  const editButtons =
    data?.article.author.username === username ? (
      <div className="article__buttons">
        <Popconfirm
          title="Warning"
          description="Are you sure you want to delete article?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleDelete}
          placement="right"
        >
          <Link to="edit" type="button" className="article__button article__button--delete">
            Delete
          </Link>
        </Popconfirm>

        <Link to="edit" type="button" className="article__button article__button--edit">
          Edit
        </Link>
      </div>
    ) : null;

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
              <button
                className={
                  !data.article.favorited ? 'article__like' : 'article__like article__like--liked'
                }
                type="button"
                aria-label="like"
                onClick={
                  data.article.favorited
                    ? () => handleUnlike(slug || '')
                    : () => handleLike(slug || '')
                }
              />
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
          <div className="article__author-info">
            <div className="article__credits">
              <span className="article__name">{data.article.author.username}</span>
              <span className="article__date">
                {format(new Date(data.article.createdAt), 'PP')}
              </span>
            </div>
            <img src={data.article.author.image} alt="" />
          </div>
          {editButtons}
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
