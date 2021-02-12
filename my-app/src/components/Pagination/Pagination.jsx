import React from 'react';
import style from './Pagination.module.scss';
import { rangeGenerator } from '../../utils';
import PaginationItem from './PaginationItem';

function Pagination({
  totalCount, limit, currentPage, url,
}) {
  const pagesCount = Math.ceil(totalCount / limit);
  const pages = rangeGenerator(1, pagesCount);

  return (
    <ul className={style.pagesList}>
      {pages.map((page) => (
        <PaginationItem page={page} currentPage={currentPage} url={url} key={page} />
      ))}
    </ul>
  );
}

export default Pagination;
