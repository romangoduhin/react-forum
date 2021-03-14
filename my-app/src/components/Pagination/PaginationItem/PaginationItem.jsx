import React from 'react';
import { Link } from 'react-router-dom';
import style from './PaginationItem.module.scss';

function PaginationItem({ page, currentPage, url }) {
  return (
    <li className={currentPage === page ? style.pagesItemActive : style.pagesItem}>
      <Link to={`${url}?page=${page}`} className={style.pagesItemLink}>{page}</Link>
    </li>
  );
}

export default PaginationItem;
