import React from 'react';
import { Link } from 'react-router-dom';
import style from './Feed.module.scss';

function Feed({ articles }) {
  return (
    <div className={style.articlesWrapper}>
      <ul className={style.articlesList}>
        {articles.map((article) => (
          <li className={style.articleWrapper} key={article.slug}>
            <div className={style.author}>
              <img className={style.userImage} src={article.author.image} alt="" />
              <div className={style.userInfo}>
                <span className={style.userName}>{article.author.username}</span>
                <span className={style.createdAt}>{article.createdAt}</span>
              </div>
            </div>
            <div className={style.description}>
              <h3 className={style.title}>{article.title}</h3>
              <p className={style.body}>{article.body}</p>
              {(article.tagList.length !== 0) && (
                <ul className={style.tagList}>
                  {article.tagList.map((tag) => (
                    <li className={style.tagListItem}>
                      <Link to={`/tags/${tag}`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              )}
              <span>Read more...</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Feed;
