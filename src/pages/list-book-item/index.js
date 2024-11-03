import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import classNames from "classnames/bind";
import styles from "./list-book-item-modele.scss";
import axios from "axios";

import img_list from "./e3cc4c9bef8fc28dfef26231a0768701.jpg";
import { Grid } from "@mui/material";

import Loading from "././../../pages/iconLoad/Loading";
import Error from "././../../pages/iconLoad/Error";
import NotFound from "././../../pages/iconLoad/NotFound";

import Pagination from "../../compodens/Layout/DefaultLayout/Sidebar/paga_demo/pagae2";
const cx = classNames.bind(styles);

function Cart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 30;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/bookstore_api/api/products"
        );
        console.log(response.data); // Log the fetched data
        setProducts(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className={cx("center")}>
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className={cx("center")}>
        <Error />
      </div>
    );
  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  const renderCard = (product, index) => (
    <Grid item md={2.5} xs={6} sm={4} key={index} className={cx("playcart")}>
      <a className={cx("Nav-lin")} href={`/book/${product.productId}`}>
        <div className={cx("card")}>
          <img
            className={cx("item-book")}
            src={product.image}
            alt={product.name || "Product Image"}
          />
          <div>
            <h1 className={cx("Name-item")}>{product.name || "No Name"}</h1>
            <div className={cx("price-CART")}>
              <div className={cx("price-CAR3")}>
                <p className={cx("price-sale")}>{product.price}</p>
                <p className={cx("price")}>{product.price}</p>
              </div>
              <div className={cx("price-CAR2")}>
                <p>
                  <span className={cx("sale-buggert")}>
                    {Math.round(
                      ((product.price - product.price) / product.price) * 100
                    )}
                    %
                  </span>
                </p>
              </div>
            </div>
            <div className={cx("duc")}>
              <div className={cx("price-CART")}>
                <Rating
                  name="read-only"
                  value={Number(product.star) || 0}
                  readOnly
                />
              </div>
              <div className={cx("price-CART")}>
                <p className={cx("price-Text")}>Đã bán</p>
                <p className={cx("price-soluong")}>{product.sold || 0}</p>
              </div>
            </div>
            <div className={cx("Distance")}>
              <div className={cx("price-CART")}>
                <p className={cx("price-day")}>2-3 Ngày</p>
              </div>
              <div className={cx("price-CART")}>
                <p className={cx("diachi")}>Hà Nội</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Grid>
  );

  return (
    <div className={cx("list_item_page")}>
      <div className={cx("LIST")}>
        {currentPosts.map((product, index) => renderCard(product, index))}
      </div>
      <Pagination
        totalPosts={products.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
}

export default Cart;
