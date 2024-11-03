import React from "react";
import styles from "./Now-buy-module.scss";
import Dissacount_Code from "../Dissacount_code";
import Buttonn from "../../../../Layout/DefaultLayout/button"; //button
import classnames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

function Button_fix({ selectedItems, onClick }) {
  // Tính tổng giá trị và số lượng sản phẩm
  const totalPayment = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className={cx("sidebar-container")}>
      <Dissacount_Code className={cx("choose-input-text")} />
      <div className={cx("checkout-section")}>
        <div className={cx("select-all-container")}>
          <p className={cx("select-all-text")}>Chọn Tất cả:</p>
          <p className={cx("item-count")}>{selectedItems.length}</p>
        </div>
        <p className={cx("delete-text")}>Xóa</p>
        <div className={cx("product-count-list")}>
          <p className={cx("total-payment-text")}>Tổng Thanh Toán:</p>
          <p className={cx("product-count")}>{selectedItems.length} Sản Phẩm</p>
        </div>
        <p className={cx("total-price")}>{totalPayment.toLocaleString()} VNĐ</p>
        <Link to="/Buy_pay">
          <Buttonn primary1 className={cx("buy-now-button")} onClick={onClick}>
            Mua Ngay
          </Buttonn>
        </Link>
      </div>
    </div>
  );
}

export default Button_fix;
