import './Article.scss';

function Article() {
  return (
    <>
      <div className="article__info">
        <div className="article__header">
          <p className="article__title">hhh</p>
          <label className="article__label">
            <button className="article__like" type="button" aria-label="like" />
            <span>h</span>
          </label>
        </div>
        <div className="article__tags">h</div>
        <p className="article__paragraph">h</p>
        <div className="article__body">hhhh</div>
      </div>
      <div className="article__author">
        <div className="article__credits">
          <span className="article__name">hhh</span>
          <span className="article__date">hhh</span>
        </div>
        <img src="" alt="" />
      </div>
    </>
  );
}

export default Article;
