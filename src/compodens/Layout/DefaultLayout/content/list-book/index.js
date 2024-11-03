import classnames from "classnames/bind";
import Img1 from "./img/tải-xuống-_3_.png";
import Img2 from "./img/tải-xuống-_4_.png";
import styles from "./list-book-module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const cx = classnames.bind(styles);
function Cart() {
  const [product, setproduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/bookstore_api/api/products-top")
      .then((response) => response.json())
      .then((json) => setproduct(json));
  }, []);
  return (
    <div className={cx("book-list-")}>
      {product.map((products) => (
        <Link
          className={cx("Nav-lin")}
          to={`/book/${products.productId}`}
          key={products.productId}
        >
          <div className={cx("ljhlkjhlkjhdslkjf")}>
            <img
              className={cx("list-item")}
              src={products.image}
              alt="First slide"
            />
            <div className={cx("leader_sold")}>
              <p>Đã bán {products.sold}</p>
            </div>

            <div class="badge">
              <p>Top</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Cart;
