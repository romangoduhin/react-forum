import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from './PopularTags.module.scss';
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';

function PopularTags() {
  const apiUrl = '/tags';
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) {
    return (
      <div className={style.tagsWrapper}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className={style.tagsWrapper}>
      <p className={style.tagsTitle}>Popular tags:</p>
      <div className={style.tags}>
        {response.tags.sort().map((tag) => <NavLink to={`/tags/${tag}`} key={tag} className={style.tag} activeClassName={style.activeTag}>{tag}</NavLink>)}
      </div>
    </div>
  );
}

export default PopularTags;
