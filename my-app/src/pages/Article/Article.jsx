import React, { useEffect } from 'react';
import style from './Article.module.scss';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Author from '../../components/Author';
import TagsList from '../../components/TagsList';

function Article({ match }) {
  const { articlePath } = match.params;
  const apiUrl = `/articles/${articlePath}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <div className={style.articleWrapper}>
      {isLoading && <Loading /> }
      {error && <ErrorMessage error={error} />}
      {!isLoading && response && (
        <>
          <div className={style.articleBanner}>
            <h1>{response.article.title}</h1>
            <Author author={response.article.author} createdAt={response.article.createdAt} />
          </div>

          <div className={style.articleBody}>
            <p className={style.articleText}>{response.article.body}</p>

            <TagsList tagsList={response.article.tagList} />
          </div>
        </>
      )}
    </div>
  );
}

export default Article;
