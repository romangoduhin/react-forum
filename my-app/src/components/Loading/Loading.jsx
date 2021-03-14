import React from 'react';
import style from './Loading.module.scss';

function Loading() {
  return (
    <div className={style.wrapper}>
      <div className={style.loader}>
        <div className={style.first} />

        <div className={style.second} />

        <div className={style.third} />
      </div>
    </div>
  );
}

export default Loading;
