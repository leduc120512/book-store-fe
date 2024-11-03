import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./book-retail-module.scss";
import classnames from "classnames/bind";
import {
  faStar,
  faTag,
  faSyncAlt,
  faTruck,
  faMoneyBill,
  faBoxOpen,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Button from "../../../Cart-buggest/button";
import Error from "../../../../../pages/iconLoad/Error";
import NotFound from "../../../../../pages/iconLoad/NotFound";
import Loading from "../../../../../pages/iconLoad/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Login-LogOUT/LogOut/AuthProvider/AuthProvider";

import "sweetalert2/src/sweetalert2.scss";
const cx = classnames.bind(styles);
const BookRetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState("");

  const { user } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bookstore_api/api/products/${productId}`
        );
        console.log("Book data:", response.data);
        setBookData(response.data);

        if (
          response.data.product_styles &&
          response.data.product_styles.length > 0
        ) {
          setSelectedStyle(response.data.product_styles[0]);
        } else {
          setSelectedStyle("");
        }
      } catch (error) {
        console.error("Error fetching book retail data:", error);
        alert("Có lỗi xảy ra khi tải sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [productId]);

  if (loading)
    return (
      <div className={cx("center")}>
        <Loading />.
      </div>
    );
  if (!bookData)
    return (
      <div className={cx("center")}>
        <Error />
      </div>
    );

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const addToCart = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    const cartItem = {
      user_id: user.userId, // Giả sử user có thuộc tính id
      product_id: productId,
      quantity: quantity,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/bookstore_api/api/cart",
        cartItem
      );
      Swal.fire({
        title: "Thành Công",
        text: "Thêm sản phẩm thành công",
        icon: "success",
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
    }
  };
  const addBuy = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    const cartItem = {
      user_id: user.userId, // Giả sử user có thuộc tính id
      product_id: productId,
      quantity: quantity,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/bookstore_api/api/cart",
        cartItem
      );
      navigate("/BUY");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
    }
  };
  return (
    <div className={cx("book-details")}>
      {bookData && bookData.length > 0 && (
        <div className={cx("item-details")}>
          <div className={cx("details-section")}>
            <p className={cx("favorite-label")}>Yêu Thích</p>
            <p className={cx("product-description")}>{bookData[0].name}</p>
          </div>
          <div className={cx("ratings-group")}>
            <div className={cx("rating-section duc12")}>
              <p className={cx("rating-value")}>{bookData.star}</p>
              <div className={cx("stars-wrapper")}>
                {[...Array(5)].map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    className={cx("rating-value1")}
                    icon={faStar}
                    color={index < bookData.star ? "yellow" : "grey"}
                  />
                ))}
              </div>
            </div>
            <div className={cx("reviews-detail duc12")}>
              <p className={cx("reviews-count")}>{bookData.evalu}</p>
              <p className={cx("reviews-label")}>Đánh Giá</p>
            </div>
            <div className={cx("sales-section duc12")}>
              <div className={cx("sold-detail duc12")}>
                <p className={cx("sold-count")}>{bookData[0].sold}</p>
                <p className={cx("sold-label")}>Đã Bán</p>
              </div>
            </div>
          </div>

          <div className={cx("pricing-details")}>
            <div className={cx("price-section duc12")}>
              <div className={cx("original-price-wrapper duc12")}>
                <p className={cx("original-price")}>{bookData[0].price}</p>
              </div>
            </div>
            <div className={cx("discount-section duc12")}>
              <p className={cx("discount-percentage")}>
                {((1 - bookData.price / bookData.price) * 100).toFixed(2)}%
              </p>
            </div>
          </div>

          <div className={cx("shipping-details")}>
            <div className={cx("return-policy")}>
              <p className={cx("trahang")}>Chính Sách Trả Của Shop</p>
              <div className={cx("chuyen1")}>
                <FontAwesomeIcon icon={faSyncAlt} />
                <p className={cx("return-time")}>Trả Hàng trong 15 ngày</p>
                <p className={cx("free-exchange")}>Đổi Miễn Phí</p>
                <FontAwesomeIcon icon={faSyncAlt} />
              </div>
            </div>

            <div className={cx("chinh")}>
              <p className={cx("delivery-text")}>Vận Chuyển</p>
              <div className={cx("delivery-div")}>
                <div className={cx("delivery-div1 duc12")}>
                  <p className={cx("free-shipping")}>Miễn Phí Vận Chuyển</p>
                </div>
                <div className={cx("hoai1")}>
                  <div className={cx("delivery-div12 duc12")}>
                    <p className={cx("shipping-destination")}>Vận Chuyển Tới</p>
                    {!user ? (
                      <p className={cx("destination-address")}>
                        Bạn Chưa Đăng Nhập
                      </p>
                    ) : (
                      <p className={cx("destination-address")}>
                        {user.address}
                      </p>
                    )}
                  </div>
                  <div className={cx("duc12")}>
                    <p className={cx("shipping-fee-label")}>Phí Vận Chuyển</p>
                    <div className={cx("oi")}>
                      <FontAwesomeIcon icon={faMoneyBill} />
                      <p className={cx("shipping-fee")}>0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("your-div-class-name")}>
            <div className={cx("your-div-class-name1")}>Lựa Chọn Sản Phẩm</div>
            <div className={cx("your-div-class-butoon")}>
              {bookData.product_styles && bookData.product_styles.length > 0 ? (
                bookData.product_styles.map((style, index) => (
                  <Button
                    key={index}
                    primary
                    more
                    className={cx("button-class-2", {
                      selected: style === selectedStyle,
                    })}
                    onClick={() => setSelectedStyle(style)}
                  >
                    {style}
                  </Button>
                ))
              ) : (
                <p>Không có lựa chọn sản phẩm nào.</p>
              )}
            </div>
          </div>

          <div className={cx("another-div-class-name")}>
            <p>Số Lượng</p>
            <div className={cx("duc12")}>
              <FontAwesomeIcon
                className={cx("icon-")}
                icon={faMinus}
                onClick={decreaseQuantity}
              />
              <input
                
                value={quantity}
                onChange={handleInputChange}
                className={cx("quantity-input")}
              />
              <FontAwesomeIcon
                className={cx("icon-")}
                icon={faPlus}
                onClick={increaseQuantity}
              />
              <div className={cx("duc12 chdddd")}>
                <p className={cx("product-current")}>{bookData[0].sold}</p>
              </div>
            </div>
          </div>

          <div className={cx("duc12")}>
            <div className={cx("duc122")}>
              <div className={cx("button-wrapper", "hdkd")}>
                {!user ? (
                  <Link className={cx("buy-now-bDDD", "leudcsds")} to="/LOGIN">
                    <button className={cx("cartBtn")}>
                      <svg
                        className={cx("cart")}
                        fill="white"
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                      </svg>
                      MUA NGAY
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 640 512"
                        className={cx("product")}
                      >
                        <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path>
                      </svg>
                    </button>
                  </Link>
                ) : (
                  <div className={cx("leducssprhjfkdf")}>
                    <button onClick={addBuy} className={cx("cartBtn")}>
                      <svg
                        className={cx("cart")}
                        fill="white"
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                      </svg>
                      MUA NGAY
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 640 512"
                        className={cx("product")}
                      >
                        <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path>
                      </svg>
                    </button>
                  </div>
                )}
                {!user ? (
                  <Link className={cx("buy-now-bDDD")} to="/LOGIN">
                    <button className={cx("cartBtn")}>
                      <svg
                        className={cx("cart")}
                        fill="white"
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                      </svg>
                      THÊM VÀO GIỎ HÀNG
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 640 512"
                        className={cx("product")}
                      >
                        <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path>
                      </svg>
                    </button>
                  </Link>
                ) : (
                  <div className={cx("cartsdsBtn")}>
                    <button onClick={addToCart} className={cx("cartBtn")}>
                      <svg
                        className={cx("cart")}
                        fill="white"
                        viewBox="0 0 576 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                      </svg>
                      THÊM VÀO GIỎ HÀNG
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 640 512"
                        className={cx("product")}
                      >
                        <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookRetail;
