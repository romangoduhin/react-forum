import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import style from './TopBar.module.scss';
import reactumLogo from '../../assets/images/reactumLogo.png';

function TopBar() {
  return (
    <nav className={style.navBar}>
      <div className={style.container}>
        <Link className={style.title} to="/">
          <img src={reactumLogo} alt="reactumLogo" />
        </Link>
        <ul className={style.navList}>
          <li className={style.navItem}>
            <NavLink className={style.navLink} activeClassName={style.navLinkActive} exact to="/">Home</NavLink>
          </li>
          <li className={style.navItem}>
            <NavLink className={style.navLink} activeClassName={style.navLinkActive} to="/login">Sign In</NavLink>
          </li>
          <li className={style.navItem}>
            <NavLink className={style.navLink} activeClassName={style.navLinkActive} to="/signup">Sign Up</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default TopBar;
