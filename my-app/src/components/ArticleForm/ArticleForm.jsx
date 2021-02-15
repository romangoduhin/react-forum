import React, { useState, useEffect } from 'react';
import style from './ArticleForm.module.scss';
import ErrorMessages from '../ErrorMessages';

function ArticleForm({
  onSubmit, error, initialValues, isLoading,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tagsList, setTagsList] = useState('');

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      body,
      tagsList,
    });
  };

  useEffect(() => {
    if (!initialValues) {
      return;
    }
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setBody(initialValues.body);
    setTagsList(initialValues.tagsList.join(' '));
  }, [initialValues]);

  return (
    <div className={style.articleFormWrapper}>
      <div className={style.articleFormBanner}>
        <p>Create article</p>
      </div>

      <form className={style.formWrapper}>
        {(error && error.errors) && <ErrorMessages error={error.errors} />}
        <input
          type="text"
          id="title"
          placeholder="Article title"
          autoComplete="off"
          className={style.formInput}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <input
          type="text"
          id="description"
          placeholder="What is this article about?"
          autoComplete="off"
          className={style.formInput}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <textarea
          id="body"
          cols="30"
          rows="10"
          placeholder="Write your article"
          value={body}
          className={style.formTextArea}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />

        <input
          type="text"
          id="tags"
          placeholder="Enter tags"
          autoComplete="off"
          value={tagsList}
          className={style.formInput}
          onChange={(e) => {
            setTagsList(e.target.value);
          }}
        />

        <button
          className={style.formButton}
          type="button"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Publish Article
        </button>
      </form>
    </div>
  );
}
export default ArticleForm;
