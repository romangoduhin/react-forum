import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className={style.tagsWrapper}>
      <h2 className={style.tagsTitle}>Popular tags</h2>
      <div className={style.tags}>
        {response.tags.sort().map((tag) => <Link to={`/tags/${tag}`} key={tag} className={style.tag}>{tag}</Link>)}
      </div>
    </div>
  );
}

export default PopularTags;
