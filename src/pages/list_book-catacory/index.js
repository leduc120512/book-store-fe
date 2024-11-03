import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import styles from "./List_book_catacory.module.scss"; // Ensure this path is correct
import img_list from "./e3cc4c9bef8fc28dfef26231a0768701.jpg";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Loading from "././../../pages/iconLoad/Loading";
import Error from "././../../pages/iconLoad/Error";
import NotFound from "././../../pages/iconLoad/NotFound";
const cx = classNames.bind(styles);

function List_book_catacory() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/bookstore_api/api/products"
        );
        const allProducts = response.data;

        // Filter and sort products based on categoryName
        const sortedProducts = allProducts
          .filter((product) => product.categoryName) // Ensure categoryName is defined
          .sort((a, b) => {
            const aCategory = a.categoryName
              ? a.categoryName.toLowerCase()
              : "";
            const bCategory = b.categoryName
              ? b.categoryName.toLowerCase()
              : "";
            const categoryLower = category ? category.toLowerCase() : "";

            const aCategoryMatchExact = aCategory === categoryLower;
            const bCategoryMatchExact = bCategory === categoryLower;
            const aCategoryMatchPartial = aCategory.includes(categoryLower);
            const bCategoryMatchPartial = bCategory.includes(categoryLower);

            if (aCategoryMatchExact && !bCategoryMatchExact) return -1;
            if (!aCategoryMatchExact && bCategoryMatchExact) return 1;
            if (aCategoryMatchPartial && !bCategoryMatchPartial) return -1;
            if (!aCategoryMatchPartial && bCategoryMatchPartial) return 1;
            return 0;
          });

        setProducts(sortedProducts);
      } catch (error) {
        console.error(error); // Log the error for debugging
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

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

  const renderCard = (product) => (
    <Grid className={cx("list_item_product")} item md={2.5} xs={6} sm={4}>
      <div key={product.productId} className={cx("playcart")}>
        <Link className={cx("Nav-lin")} to={`/book/${product.productId}`}>
          <div className={cx("card")}>
            <img
              className={cx("item-book")}
              src={product.image}
              alt={product.name}
            />
            <div>
              <h1 className={cx("Name-item")}>{product.name}</h1>
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
                    value={Number(product.star)}
                    readOnly
                  />
                </div>
                <div className={cx("price-CART")}>
                  <p className={cx("price-Text")}>Đã bán</p>
                  <p className={cx("price-soluong")}>{product.sold}</p>
                </div>
              </div>
              <div className={cx("Distance")}>
                <div className={cx("price-CART")}>
                  <p className={cx("price-day")}>2-3 Ngày</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Grid>
  );

  return (
    <div className={cx("LIST")}>
      {products.map((product) => renderCard(product))}
    </div>
  );
}

export default List_book_catacory;
