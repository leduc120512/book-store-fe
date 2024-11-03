import styles from "./BuyNow-module.scss";
import classnames from "classnames/bind";
import QRCodeImage from "./qrcode.jpg";
import Button_fix from "./now-buy";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faCartArrowDown,
  faDeleteLeft,
  faMagnifyingGlass,
  faMinus,
  faPlug,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Login-LogOUT/LogOut/AuthProvider/AuthProvider";
import { useSelectedProducts } from "./SelectedProductsContext/SelectedProductsContext";

const cx = classnames.bind(styles);

function BuyNowComponent() {
  const { cartItems } = useAuth();
  const { updateSelectedProducts } = useSelectedProducts();
  const [checkedItems, setCheckedItems] = React.useState(
    Array(cartItems.length).fill(false)
  );

  const handleParentCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setCheckedItems(Array(cartItems.length).fill(isChecked));
  };

  const handleChildCheckboxChange = (index) => (event) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);
  };

  const isParentChecked = checkedItems.every(Boolean);
  const isParentIndeterminate = checkedItems.some(Boolean) && !isParentChecked;
  const navigate = useNavigate();
  // Lấy các sản phẩm đã chọn
  const selectedItems = cartItems.filter((_, index) => checkedItems[index]);

  const handleBuyNow = () => {
    updateSelectedProducts(selectedItems);
  };
  return (
    <div className={cx("BuyNowContainer")}>
      <div className={cx("BuyNowContainer-header-main")}>
        <p>Sản Phẩm</p>
        <div className={cx("BuyNowContainer-header")}>
          <p className={cx("BuyNowContainer-header1 l")}>Đơn Giá</p>
          <p className={cx("BuyNowContainer-header2 l")}>Số Lượng</p>
          <p className={cx("BuyNowContainer-header3 l")}>Số Tiền</p>
          <p className={cx("BuyNowContainer-header4 l")}>Thao Tác</p>
        </div>
      </div>
      <div className={cx("BuyNowInnerContainer")}>
        <div className={cx("BuyNowHeader")}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{ "& .MuiSvgIcon-root": { fontSize: 23 } }}
                checked={isParentChecked}
                indeterminate={isParentIndeterminate}
                onChange={handleParentCheckboxChange}
              />
            }
          />
          <div className={cx("BuyNowFavorites")}>
            <p className={cx("buyNow-p")}>Yêu thích</p>
            <FontAwesomeIcon className={cx("buyNow-icon1")} icon={faMessage} />
          </div>
        </div>
        <div className={cx("BuyNowBody")}>
          <div className={cx("BuyNowPromotion")}>
            <p>ComBo khuyến Mãi</p>
            <p>Mua 3 sản phẩm giảm 1%, giảm 3%</p>
            <div className={cx("BuyNowAddMore")}>
              <p>Thêm</p>
              <FontAwesomeIcon
                className={cx("BuyNddddowAddMore")}
                icon={faArrowAltCircleDown}
              />
            </div>
          </div>
          <div className={cx("BuyNowProducts")}>
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              <div className={cx("BuyNowProductItem")}>
                <table>
                  {cartItems.map((cartItems1, index) => (
                    <tr key={cartItems1.id} className={cx("tr_list_item")}>
                      <td>
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 23 } }}
                              checked={checkedItems[index]}
                              onChange={handleChildCheckboxChange(index)}
                            />
                          }
                        />
                      </td>
                      <td >
                        <img
                          className={cx("BuyNowProductIimg")}
                          src={cartItems1.image}
                          alt={cartItems1.productName}
                        />
                      </td>
                      <td className={cx("img_list_cart")}>
                        <p className={cx("BuyNowProductDesc")}>
                          {cartItems1.productName}
                        </p>
                      </td>
                      <td>
                        <div className={cx("BuyNowProductClassification")}>
                          <p className={cx("BuyNowProductClasstupe")}>
                            Thể loại
                          </p>
                          <p className={cx("BuyNowProductClasshang")}>
                            {cartItems1.categoryName}
                          </p>
                        </div>
                      </td>
                      <td>
                        <p className={cx("BuyNowProductFinalPrice")}>
                          {cartItems1.price}
                        </p>
                      </td>
                      <td>
                        <div className={cx("BuyNowProductQuantity kkk")}>
                          <FontAwesomeIcon icon={faMinus} />
                          <p className={cx("BuyNowProducttt")}>
                            {cartItems1.quantity}
                          </p>
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                      </td>
                      <td>
                        <p className={cx("BuyNowProductFinalPrice")}>
                          {(
                            cartItems1.quantity * cartItems1.price
                          ).toLocaleString()}
                        </p>
                      </td>
                      <td>
                        <div className={cx("BuyNowProductRemove")}>
                          <button className={cx("bin-button")}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 39 7"
                              className="bin-top"
                            >
                              <line
                                strokeWidth="4"
                                stroke="white"
                                y2="5"
                                x2="39"
                                y1="5"
                              ></line>
                              <line
                                strokeWidth="3"
                                stroke="white"
                                y2="1.5"
                                x2="26.0357"
                                y1="1.5"
                                x1="12"
                              ></line>
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 33 39"
                              className="bin-bottom"
                            >
                              <mask fill="white" id="path-1-inside-1_8_19">
                                <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                              </mask>
                              <path
                                mask="url(#path-1-inside-1_8_19)"
                                fill="white"
                                d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                              ></path>
                              <path
                                strokeWidth="4"
                                stroke="white"
                                d="M12 6L12 29"
                              ></path>
                              <path
                                strokeWidth="4"
                                stroke="white"
                                d="M21 6V29"
                              ></path>
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 89 80"
                              className="garbage"
                            >
                              <path
                                fill="white"
                                d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </Box>
          </div>
        </div>
      </div>
      <Button_fix selectedItems={selectedItems} onClick={handleBuyNow} />
    </div>
  );
}

export default BuyNowComponent;
