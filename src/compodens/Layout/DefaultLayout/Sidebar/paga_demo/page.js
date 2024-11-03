import React, { useState, useEffect } from "react";
import Pagination from "./pagae2";

const Pagination1 = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/bookstore_api/api/products"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  // Lấy các bài viết cho trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <h1>Post List</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        currentPosts.map((data, index) => (
          <div className="list" key={index}>
            <p>{data.name}</p>
            <p>{data.description}</p>
            <p>{data.price}</p>
          </div>
        ))
      )}
      <Pagination
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default Pagination1;
