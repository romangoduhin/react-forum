import React, { useEffect } from 'react';
import style from './GlobalFeed.module.scss';
import useFetch from '../../hooks/useFetch';
import Feed from '../../components/Feed';

function GlobalFeed() {
  const [{ response, error, isLoading }, doFetch] = useFetch('/articles?limit=10&offset=0');

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <div className={style.wrapper}>
      <div className={style.articles}>
        {isLoading && <div>Loading</div>}
        {error && <div>{`Error: ${error}`}</div>}
        {!isLoading && response && <Feed articles={response.articles} />}
      </div>

      <div className={style.tags}>
        Tags
      </div>
    </div>
  );
}

export default GlobalFeed;
