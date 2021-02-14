import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from './TagsList.module.scss';

function TagsList({ tagsList }) {
  return (
    <ul className={style.tagList}>
      {tagsList.map((tag) => (
        <li className={style.tagListItem} key={tag}>
          <NavLink className={style.tag} activeClassName={style.activeTag} to={`/tags/${tag}`}>{tag}</NavLink>
        </li>
      ))}
    </ul>
  );
}

export default TagsList;
