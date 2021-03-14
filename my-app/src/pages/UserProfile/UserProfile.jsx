import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from './UserProfile.module.scss';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading';
import ErrorMessages from '../../components/ErrorMessages';
import UserProfileArticles from '../../components/UserProfileArticles';

function UserProfile({ location, match }) {
  const { profilePath } = match.params;
  const apiUrl = `/profiles/${profilePath}`;
  const isFavoritedArticles = location.pathname.includes('favorites');
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  useEffect(() => {
    doFetch();
  }, [doFetch, profilePath]);

  return (
    <div className={style.profileWrapper}>
      {isLoading && <Loading />}
      {error && <ErrorMessages error={error} />}
      {!isLoading && response && (
        <>
          <div className={style.userInfo}>
            <img className={style.userImage} src={response.profile.image} alt="" />
            <div className={style.userBio}>
              <h1>{response.profile.username}</h1>
              <p>{response.profile.bio}</p>
            </div>
          </div>
          <div className={style.userArticles}>
            <ul className={style.togglerList}>
              <li className={style.togglerItem}>
                <NavLink
                  to={`/profiles/${response.profile.username}`}
                  className={style.togglerLink}
                  activeClassName={style.activeTogglerLink}
                  exact
                >
                  My Articles
                </NavLink>
              </li>

              <li className={style.togglerItem}>
                <NavLink
                  to={`/profiles/${response.profile.username}/favorites`}
                  className={style.togglerLink}
                  activeClassName={style.activeTogglerLink}
                >
                  Favorited Articles
                </NavLink>
              </li>
            </ul>

            <UserProfileArticles
              username={response.profile.username}
              location={location}
              isFavoritedArticles={isFavoritedArticles}
              url={match.url}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
