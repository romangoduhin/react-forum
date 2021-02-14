import React from 'react';
import style from './Author.module.scss';

function Author({ author, createdAt }) {
  return (
    <div className={style.author}>
      <img className={style.userImage} src={author.image} alt="" />
      <div className={style.userInfo}>
        <span className={style.userName}>{author.username}</span>
        <span className={style.createdAt}>{createdAt}</span>
      </div>
    </div>
  );
}
export default Author;
