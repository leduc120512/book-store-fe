import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import Button from "../../Cart-buggest/button";
import {
  faCartArrowDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./cart.module.scss";
import Cart_action from "./cart-action";
import { useAuth } from "../Login-LogOUT/LogOut/AuthProvider/AuthProvider";
const cx = classnames.bind(styles);
function Cart() {
  const { user } = useAuth();
  return (
    <div className={cx("uploat1")}>
      {/* upload */}

      {/* Tin Nhắn */}

      {/* Hộp Thư Đến */}
      {!user ? (
        <div className={cx("search")}>
          <Link to="/LOGIN">
            <button className={cx("search-btn")}>
              <FontAwesomeIcon icon={faCartArrowDown} />
            </button>
          </Link>
          <Link className={cx("login_main")} to="/LogIn">
            Đăng Nhập
          </Link>
          <Link className={cx("login_login")} to="LOGIN/LogIn/Confirm">
            Đăng Ký
          </Link>
        </div>
      ) : (
        <div className={cx("search1")}>
          {" "}
          <Link to="/BUY">
            <button className={cx("search-btn")}>
              <FontAwesomeIcon icon={faCartArrowDown} />
            </button>
          </Link>
          <Cart_action className={cx("User")} />
        </div>
      )}

      {/* button anh */}
    </div>
  );
}

export default Cart;
