import React from "react";
import styles from "../siderbar-module.scss";
import classnames from "classnames/bind";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const cx = classnames.bind(styles);
const Pagination1 = ({
  totalPosts,
  postsPerPage,
  currentPage,
  handlePagination,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={currentPage === pageNumber ? "active" : ""}
          onClick={() => handlePagination(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}{" "}
      <Stack spacing={2}>
        {pageNumbers.map((pageNumber) => (
          <Pagination
            onClick={() => handlePagination(pageNumber)}
            count={pageNumber}
            variant="outlined"
            color="primary"
          />
        ))}
      </Stack>
    </div>
  );
};

export default Pagination1;
