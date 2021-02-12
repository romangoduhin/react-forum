import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import style from './TopBar.module.scss';
import reactumLogo from '../../assets/images/reactumLogo.png';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function TopBar() {
  const [currentUserData] = useContext(CurrentUserContext);

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

          {currentUserData.isLogged === false && (
            <>
              <li className={style.navItem}>
                <NavLink className={style.navLink} activeClassName={style.navLinkActive} to="/login">Sign In</NavLink>
              </li>

              <li className={style.navItem}>
                <NavLink className={style.navLink} activeClassName={style.navLinkActive} to="/signup">Sign Up</NavLink>
              </li>
            </>
          )}

          {currentUserData.isLogged === true && (
            <>
              <li className={style.navItem}>
                <NavLink className={style.navLink} activeClassName={style.navLinkActive} to="/articles/new">
                  <i className="ion-compose" />
                  {' '}
                  <span>New Post</span>
                </NavLink>
              </li>

              <li className={style.navItem}>
                <NavLink
                  className={style.navLink}
                  activeClassName={style.navLinkActive}
                  to={`/profiles/${currentUserData.currentUser.username}`}
                >
                  {currentUserData.currentUser.image ? <img src={currentUserData.currentUser.image} alt="" />
                    : <i className="ion-person" />}
                  {' '}
                  <span>{currentUserData.currentUser.username}</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default TopBar;
