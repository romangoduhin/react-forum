import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import ArticleForm from '../../components/ArticleForm';
import useFetch from '../../hooks/useFetch';

function EditArticle({ match }) {
  const { articlePath } = match.params;
  const apiUrl = `/articles/${articlePath}`;
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
  const [{ response: fetchArticleResponse }, doFetchArticleResponse] = useFetch(apiUrl);
  const [{
    response: updateArticleResponse,
    error: updateArticleError,
    isLoading,
  }, doUpdateArticleResponse] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    doFetchArticleResponse();
  }, [doFetchArticleResponse]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagsList: fetchArticleResponse.article.tagList,
    });
  }, [fetchArticleResponse]);

  const onSubmit = (article) => {
    doUpdateArticleResponse({
      method: 'put',
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }

    setIsSuccessfulSubmit(true);
  }, [updateArticleResponse]);

  if (isSuccessfulSubmit) {
    return <Redirect to={`/article/${updateArticleResponse.article.slug}`} />;
  }

  return (
    <ArticleForm
      onSubmit={onSubmit}
      error={updateArticleError}
      initialValues={initialValues}
      isLoading={isLoading}
    />
  );
}

export default EditArticle;
