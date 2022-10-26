import React from "react";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const fetchPageNumbers = (
  totalPages,
  currentPage,
  pageNeighbours,
  pageChange
) => {
  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    pageChange(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    pageChange(currentPage + pageNeighbours * 2 + 1);
  };
  if (totalPages > totalBlocks) {
    let pages = [];

    const leftBound = currentPage - pageNeighbours;
    const rightBound = currentPage + pageNeighbours;
    const beforeLastPage = totalPages - 1;

    const startPage = leftBound > 2 ? leftBound : 2;
    const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

    pages = range(startPage, endPage);

    const pagesCount = pages.length;
    const singleSpillOffset = totalNumbers - pagesCount - 1;

    const leftSpill = startPage > 2;
    const rightSpill = endPage < beforeLastPage;

    const leftSpillPage = LEFT_PAGE;
    const rightSpillPage = RIGHT_PAGE;

    if (leftSpill && !rightSpill) {
      const extraPages = range(startPage - singleSpillOffset, startPage - 1);
      pages = [leftSpillPage, ...extraPages, ...pages];
    } else if (!leftSpill && rightSpill) {
      const extraPages = range(endPage + 1, endPage + singleSpillOffset);
      pages = [...pages, ...extraPages, rightSpillPage];
    } else if (leftSpill && rightSpill) {
      pages = [leftSpillPage, ...pages, rightSpillPage];
    }

    return [1, ...pages, totalPages].reverse();
  }

  return range(1, totalPages).reverse();
};

const Pagination = ({
  totalPages,
  currentPage,
  pageNeighbours,
  pageChange,
}) => {
  const pages = fetchPageNumbers(
    totalPages,
    currentPage,
    pageNeighbours,
    pageChange
  );
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {pages.map((page, index) => {
          if (page === RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => pageChange(currentPage + 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            );

          if (page === LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => pageChange(currentPage - 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
            );

          return (
            <li
              key={index}
              className={`page-item${currentPage === page ? " active" : ""}`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => pageChange(page, e)}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Pagination;
