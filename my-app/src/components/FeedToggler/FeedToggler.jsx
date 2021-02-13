import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import style from './FeedToggler.module.scss';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function FeedToggler({ tagName }) {
  const [currentUser] = useContext(CurrentUserContext);
  return (
    <div className={style.togglerWrapper}>
      <ul className={style.togglerList}>
        <li className={style.togglerItem}>
          <NavLink to="/" className={style.togglerLink} activeClassName={style.activeTogglerLink} exact>Global Feed</NavLink>
        </li>
        {currentUser && (
        <li className={style.togglerItem}>
          <NavLink to="/feed" className={style.togglerLink} activeClassName={style.activeTogglerLink}>Your Feed</NavLink>
        </li>
        )}
        {tagName && (
        <li className={style.togglerItem}>
          <NavLink to={`/tags/${tagName}`} className={style.togglerLink} activeClassName={style.activeTogglerLink}>
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
