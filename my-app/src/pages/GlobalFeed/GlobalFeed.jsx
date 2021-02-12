import React, { useEffect } from 'react';
import { stringify } from 'query-string';
import style from './GlobalFeed.module.scss';
import useFetch from '../../hooks/useFetch';
import Feed from '../../components/Feed';
import Pagination from '../../components/Pagination';
import { getPageAndOffset, limit } from '../../utils';

function GlobalFeed({ location, match }) {
  const { url } = match;
  const { currentPage, offset } = getPageAndOffset(location.search);
  const stringifiedParams = stringify({ limit, offset });
  const apiUrl = `/articles?${stringifiedParams}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className={style.wrapper}>
      <div className={style.articles}>
        {isLoading && <div>Loading</div>}
        {error && <div>{`Error: ${error}`}</div>}
        {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            totalCount={response.articlesCount}
            limit={limit}
            currentPage={currentPage}
            url={url}
          />
        </>
        )}
      </div>

      <div className={style.tags}>
        Tags
      </div>
    </div>
  );
}

export default GlobalFeed;
