import React from 'react';
import { Link } from 'react-router-dom';
import style from './Feed.module.scss';
import TagsList from '../TagsList';
import Author from '../Author';

function Feed({ articles }) {
  return (
    <div className={style.articlesWrapper}>
      <ul className={style.articlesList}>
        {articles.map((article) => (
          <li className={style.articleWrapper} key={article.slug}>
            <Author author={article.author} createdAt={article.createdAt} />
            <div className={style.description}>
              <h3 className={style.title}>{article.title}</h3>
              <p className={style.body}>{article.body}</p>
              <TagsList tagsList={article.tagList} />
              <span>
                <Link to={`article/${article.slug}`}>
                  Read more...
                </Link>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Feed;
