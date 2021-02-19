import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Author.module.scss';

function Author({ author, createdAt }) {
  return (
    <div className={style.author}>
      <NavLink to={`/profiles/${author.username}`}>
        <img className={style.userImage} src={author.image} alt="" />
        <div className={style.userInfo}>
          <span className={style.userName}>{author.username}</span>
          <span className={style.createdAt}>{createdAt.slice(0, 10)}</span>
        </div>
      </NavLink>
    </div>
  );
}
export default Author;
