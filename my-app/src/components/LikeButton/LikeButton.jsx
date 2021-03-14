import React from 'react';
import style from './LikeButton.module.scss';
import useFetch from '../../hooks/useFetch';

function LikeButton({ isFavorited, favoritesCount, slug }) {
  const apiUrl = `/articles/${slug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const responseFavoritesCount = response ? response.article.favoritesCount : favoritesCount;
  const responseIsFavorited = response ? response.article.favorited : isFavorited;
  const handleLike = () => {
    doFetch({ method: responseIsFavorited ? 'delete' : 'post' });
  };

  return (
    <button
      className={responseIsFavorited ? style.activeLikeButton : style.likeButton}
      type="button"
      onClick={handleLike}
    >
      <i className="ion-heart" />
      {' '}
      <span>{responseFavoritesCount}</span>
    </button>
  );
}

export default LikeButton;
