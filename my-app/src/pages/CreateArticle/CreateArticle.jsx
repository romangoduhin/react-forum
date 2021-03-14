import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import ArticleForm from '../../components/ArticleForm';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function CreateArticle() {
  const [currentUser] = useContext(CurrentUserContext);
  const apiUrl = '/articles';
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagsList: [],
  };

  const onSubmit = (article) => {
    doFetch({
      method: 'post',
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }

    setIsSuccessfulSubmit(true);
  }, [response]);

  if (!currentUser.isLogged) {
    return <Redirect to="/" />;
  }

  if (isSuccessfulSubmit) {
    return <Redirect to={`/article/${response.article.slug}`} />;
  }

  return (
    <ArticleForm
      onSubmit={onSubmit}
      error={error}
      initialValues={initialValues}
      isLoading={isLoading}
    />
  );
}

export default CreateArticle;
