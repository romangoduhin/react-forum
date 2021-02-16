import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import style from './Article.module.scss';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading';
import ErrorMessages from '../../components/ErrorMessages';
import Author from '../../components/Author';
import TagsList from '../../components/TagsList';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Article({ match }) {
  const { articlePath } = match.params;
  const apiUrl = `/articles/${articlePath}`;
  const [{
    response: fetchArticleResponse,
    error: fetchArticleError,
    isLoading: fetchArticleLoading,
  }, doFetchArticle] = useFetch(apiUrl);
  const [{
    response: deleteArticleResponse,
    isLoading: deleteArticleLoading,
  }, doDeleteArticle] = useFetch(apiUrl);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [currentUser] = useContext(CurrentUserContext);

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUser.isLogged) {
      return false;
    }
    return fetchArticleResponse.article.author.username === currentUser.currentUser.username;
  };

  const handleDeleteArticle = () => {
    doDeleteArticle({
      method: 'delete',
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!deleteArticleResponse) {
      return;
    }
    setIsDeleteSuccess(true);
  }, [deleteArticleResponse]);

  if (isDeleteSuccess) {
    return <Redirect to="/" />;
  }

  return (
    <div className={style.articleWrapper}>
      {fetchArticleLoading && <Loading />}
      {fetchArticleError && <ErrorMessages error={fetchArticleError} />}
      {!fetchArticleLoading && fetchArticleResponse && (
        <>
          <div className={style.articleBanner}>
            <div className={style.mainInfoBlock}>
              <h1>{fetchArticleResponse.article.title}</h1>
              <Author
                author={fetchArticleResponse.article.author}
                createdAt={fetchArticleResponse.article.createdAt}
              />
            </div>
            <div className={style.buttonsBlock}>
              {isAuthor() && (
                <>
                  <Link className={style.editButton} to={`/article/${fetchArticleResponse.article.slug}/edit`}>
                    <i className="ion-edit" />
                    Edit article
                  </Link>

                  <button
                    className={style.deleteButton}
                    type="button"
                    disabled={deleteArticleLoading}
                    onClick={handleDeleteArticle}
                  >
                    <i className="ion-trash-a" />
                    Delete Article
                  </button>
                </>
              )}

            </div>
          </div>

          <div className={style.articleBody}>
            <p className={style.articleText}>{fetchArticleResponse.article.body}</p>

            <TagsList tagsList={fetchArticleResponse.article.tagList} />
          </div>
        </>
      )}
    </div>
  );
}

export default Article;
