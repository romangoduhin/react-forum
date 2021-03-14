import React, { useEffect } from 'react';
import { stringify } from 'query-string';
import Feed from '../Feed';
import Pagination from '../Pagination';
import { getPageAndOffset, limit } from '../../utils';
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading';
import ErrorMessages from '../ErrorMessages';
import style from './UserProfileArticles.module.scss';

const getUrl = ({ username, isFavoritedArticles, offset }) => {
  const params = isFavoritedArticles
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };
  return `/articles?${stringify(params)}`;
};

function UserProfileArticles({
  username, location, isFavoritedArticles, url,
}) {
  const { currentPage, offset } = getPageAndOffset(location.search);
  const apiUrl = getUrl({ username, isFavoritedArticles, offset });
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavoritedArticles, currentPage]);
  return (
    <div className={style.userArticlesWrapper}>
      {isLoading && <Loading />}
      {error && <ErrorMessages error={error} />}
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
  );
}

export default UserProfileArticles;
