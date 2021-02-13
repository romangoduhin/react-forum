import React, { useEffect } from 'react';
import { stringify } from 'query-string';
import style from './YourFeed.module.scss';
import useFetch from '../../hooks/useFetch';
import Feed from '../../components/Feed';
import Pagination from '../../components/Pagination';
import { getPageAndOffset, limit } from '../../utils';
import PopularTags from '../../components/PopularTags';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import FeedToggler from '../../components/FeedToggler';

function YourFeed({ location, match }) {
  const { url } = match;
  const { currentPage, offset } = getPageAndOffset(location.search);
  const stringifiedParams = stringify({ limit, offset });
  const apiUrl = `/articles/feed?${stringifiedParams}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className={style.wrapper}>
      <div className={style.articles}>
        <FeedToggler />
        {isLoading && <Loading /> }
        {error && <ErrorMessage error={error} />}
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
      <PopularTags />
    </div>
  );
}

export default YourFeed;
