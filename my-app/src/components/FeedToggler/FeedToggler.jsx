import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './FeedToggler.module.scss';

function FeedToggler({ tagName }) {
  return (
    <div className={style.togglerWrapper}>
      <ul className={style.togglerList}>
        <li className={style.togglerItem}>
          <NavLink to="/" className={style.togglerLink} activeClassName={style.activeTogglerLink} exact>Global Feed</NavLink>
        </li>

        <li className={style.togglerItem}>
          <NavLink to="/feed" className={style.togglerLink}>Your Feed</NavLink>
        </li>
        {tagName && (
        <li className={style.togglerItem}>
          <NavLink to={`/tags/${tagName}`} className={style.togglerLink}>
            #
            {tagName}
          </NavLink>
        </li>
        )}
      </ul>
    </div>
  );
}

export default FeedToggler;
