import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import styles from "./List_book_product.module.scss"; // Ensure this path is correct
import img_list from "./e3cc4c9bef8fc28dfef26231a0768701.jpg";
import Loading from "././../../pages/iconLoad/Loading";
import Error from "././../../pages/iconLoad/Error";
import NotFound from "././../../pages/iconLoad/NotFound";
import { Grid } from "@mui/material";
const cx = classNames.bind(styles);

function List_book_product() {
  const { productName } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/bookstore_api/api/products"
        );
        const allProducts = response.data;

        // Filter products based on the search query (productName)
        const filteredProducts = allProducts.filter(
          (product) =>
            product.name &&
            product.name.toLowerCase().includes(productName.toLowerCase())
        );

        // Sort products based on the exact match and then partial match
        const sortedProducts = filteredProducts.sort((a, b) => {
          const aNameMatchExact =
            a.name && a.name.toLowerCase() === productName.toLowerCase();
          const bNameMatchExact =
            b.name && b.name.toLowerCase() === productName.toLowerCase();
          const aNameMatchPartial = a.name
            ? a.name.toLowerCase().includes(productName.toLowerCase())
            : false;
          const bNameMatchPartial = b.name
            ? b.name.toLowerCase().includes(productName.toLowerCase())
            : false;

          if (aNameMatchExact && !bNameMatchExact) return -1;
          if (!aNameMatchExact && bNameMatchExact) return 1;
          if (aNameMatchPartial && !bNameMatchPartial) return -1;
          if (!aNameMatchPartial && bNameMatchPartial) return 1;
          return 0;
        });

        setProducts(sortedProducts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productName]);

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
    <Grid
      item
      md={2.5}
      xs={6}
      sm={4}
      key={product.productId}
      className={cx("list_item_product")}
    >
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
              <div className={cx("price-CART")}>
                <p className={cx("diachi")}>Hà Nội</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Grid>
  );

  return (
    <div className={cx("LIST")}>
      {products.map((product) => renderCard(product))}
    </div>
  );
}

export default List_book_product;
