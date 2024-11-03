import styles from "./Buy-Pay-module.scss";
import qr from "./qrcode.jpg";
import Discount_code from "../Dissacount_code"; // Fixed spelling
import Buy_change_address from "./Buy-chage-adress"; // Fixed spelling
import Buychange_giaohang from "./Buychange-giaohang";
import Swal from "sweetalert2";
import Buttonn from "../../../../Layout/Cart-buggest/button";
import classnames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useSelectedProducts } from "../../Buy-one/SelectedProductsContext/SelectedProductsContext";
import { useAuth } from "../../Login-LogOUT/LogOut/AuthProvider/AuthProvider";
const cx = classnames.bind(styles);

function Buyyy() {
  const { selectedProducts } = useSelectedProducts();
  const { user } = useAuth();

  const totalQuantity = selectedProducts.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPayment = selectedProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();
  const handlePurchase = async () => {
    const orderData = {
      user_id: user.userId,
      shipping_address: user.address, // Thay đổi ở đây
      products: selectedProducts.map((item) => ({
        // Thay đổi ở đây
        product_id: item.productId, // Thay đổi ở đây
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        name: "12",
      })),
    };
    console.log(orderData);

    try {
      const response = await fetch(
        "http://localhost:8080/bookstore_api/api/order",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      Swal.fire({
        title: "Đặt hàng thành công",
        text: "Quay lại trang chủ sau 5s!",
        icon: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 5000);
      if (!response.ok) {
        throw new Error("Đặt hàng thất bại");
      }

      const result = await response.json();
      console.log(result.message); // Hiển thị thông báo thành công cho người dùng
    } catch (error) {
      console.error("Lỗi:", error);
      // Hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <div className={cx("NowContainer")}>
      {/* header  */}

      {/* address  */}
      <div className={cx("NowAddressContainer")}>
        <div className={cx("NowAddressHeader")}>
          <p className={cx("NowAddressTitle")}>Địa chỉ nhận hàng</p>
        </div>

        <div className={cx("NowAddressTitle11")}>
          <div className={cx("NowAddressDetails yyy")}>
            <p className={cx("NowName")}>{user.nameUser}</p>
            <p className={cx("NowPhone")}>{user.phone}</p>
            <div className={cx("NowAddressDetailt yyy")}>
              <p className={cx("NowStreet")}>{user.address}</p>
            </div>
          </div>
          <div className={cx("NowDefault")}>
            <p className={cx("NowDefaultText")}>Mặc định</p>
          </div>
          <div className={cx("NowChange")}>
            {/* <p className={cx("NowChangeText")}>Thay Đổi</p> */}
            <Buy_change_address /> {/* Fixed spelling */}
          </div>
        </div>
      </div>
      {/* product  */}
      <div className={cx("NowProductContainer")}>
        <div className={cx("NowProductContainer1")}>
          <div className={cx("NowProductHeader")}>
            <div className={cx("NowProductTitleContainer")}>
              <p className={cx("NowProductTitle")}>Sản Phẩm</p>
            </div>
            <div className={cx("NowProductInfo")}>
              <p className={cx("NowProductPriceTitle")}>Đơn Giá</p>
              <p className={cx("NowProductQuantityTitle")}>Số Lượng</p>
              <p className={cx("NowProductTotalTitle")}>Thành Tiền</p>
            </div>
          </div>
          <div className={cx("NowProductDetails yyy")}>
            <p className={cx("NowFavorite")}>Yêu Thích</p>
            <p className={cx("NowMall")}>Mall</p>
            <div className={cx("NowChatContainer yyy")}>
              <p className={cx("NowChatText")}>Chat ngay</p>
              <button className="Btn">
                <span className="svgContainer">
                  <svg
                    viewBox="0 0 16 16"
                    height="2.5em"
                    className="svgIcon"
                    fill="white"
                  >
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                  </svg>
                </span>
                <span className="BG"></span>
              </button>
            </div>
          </div>
          {selectedProducts.map((item, index) => (
            // <div className={cx("NowProductItem")}>
            //   <div className={cx("NowProductItemDetails")}>
            //     <div className={cx("yyy")}>
            //       <img
            //         src={item.image}
            //         className={cx("NowProductItemDetaiimg")}
            //       />
            //       <div className={cx("NowProductDescriptionContainer qqq")}>
            //         <p className={cx("NowProductDescription")}>
            //           {item.productName}
            //         </p>
            //         <p className={cx("NowProductReturnPolicy")}>
            //           Đổi miễn phí trong 15 ngày
            //         </p>
            //       </div>
            //     </div>
            //     <div className={cx("NowProductTypeContainer yyy")}>
            //       <p className={cx("NowProductTypeTitle")}>Loại :</p>
            //       <p className={cx("NowProductType")}>M1 Trắng + USB 2.4G</p>
            //     </div>
            //     <div className={cx("NowProductPriceContainer yyy")}>
            //       <p className={cx("NowProductPrice")}>
            //         {item.price.toLocaleString()}{" "}
            //       </p>
            //       <p className={cx("NowProductQuantity")}>{item.quantity}</p>
            //       <p className={cx("NowProductTotal")}>
            //         {(item.price * item.quantity).toLocaleString()} VNĐ
            //       </p>
            //     </div>
            //   </div>
            // </div>
            <table className={cx("table_lisst_item")}>
              <tr>
                <td>
                  <img
                    src={item.image}
                    className={cx("NowProductItemDetaiimg")}
                  />
                </td>
                <td className={cx("NowsProductItemDetaiimg")}>
                  {" "}
                  <p className={cx("NowProductDescription")}>
                    {item.productName}
                  </p>
                </td>
                <td className={cx("NowProductssType")}>
                  {" "}
                  <div className={cx("NowProductTypeContainer yyy")}>
                    <p className={cx("NowProductTypeTitle")}>
                      Thể loại sách :{" "}
                    </p>

                    <p className={cx("NowProductType")}>{item.categoryName}</p>
                  </div>
                </td>
                <td className={cx("NowPsdfsdroductType")}>
                  {" "}
                  <p className={cx("NowProductPrice")}>
                    {item.price.toLocaleString()}
                  </p>
                </td>
                <td>
                  {" "}
                  <p className={cx("NowProductQuantity")}>{item.quantity}</p>
                </td>
                <td>
                  {" "}
                  <p className={cx("NowProductTotal")}>
                    {(item.price * item.quantity).toLocaleString()} VNĐ
                  </p>
                </td>
              </tr>
            </table>
          ))}
        </div>
      </div>
      {/* messsing  */}
      <div className={cx("NowMessageAndShipping")}>
        <div className={cx("NowShippin1g")}>
          <div className={cx("NowShippin11g")}>
            <div className={cx("NowMessage yyy")}>
              <p className={cx("NowMessageTitle")}>Lời nhắn:</p>
              <input
                className={cx("NowMessageTitle-input")}
                type="text"
                id="inputText"
                placeholder="Nhắn tin cho người bán"
              ></input>
            </div>
            {/* van chuyen */}
            <div className={cx("NowShipping")}>
              <div className={cx("NowShippingMethodContainer yyy")}>
                <p className={cx("NowShippingMethodTitle")}>
                  Đơn vị vận chuyển:
                </p>
                <p className={cx("NowShippingMethod")}>Nhanh</p>
                <Buychange_giaohang />
                <p className={cx("NowShippingCost")}>12.800</p>
              </div>
            </div>
          </div>
          <div className={cx("NowShippingGuaranteeContainer")}>
            <p className={cx("NowShippingGuaranteeDate")}>
              Đảm bảo nhận hàng từ 17 Tháng 5 - 18 Tháng 5
            </p>
            <p className={cx("NowShippingGuaranteeVoucher")}>
              Nhận Voucher trị giá ₫10.000 nếu đơn hàng được giao đến bạn sau
              ngày 18 Tháng 5 2024. ₫12.800
            </p>
          </div>
          <div className={cx("NowShippingFastContainer")}>
            <div className={cx("NowShippingFastOption yyy")}>
              <p className={cx("NowShippingFastOptionTitle")}>
                Hoặc chọn phương thức Hỏa Tốc để
              </p>
              <p className={cx("NowShippingFastOptionGuarantee")}>
                Đảm bảo nhận hàng vào hôm nay
              </p>
            </div>
            <p className={cx("NowShippingInspection")}>Được đồng kiểm</p>
          </div>
          <div className={cx("NowTotalContainer")}>
            <Buttonn
              onClick={handlePurchase}
              className={cx("NowTotaddlContainer")}
              primary1
            >
              {" "}
              Mua ngay
            </Buttonn>
            <div className={cx("NowTotalContainer_")}>
              <div className={cx("NowTotalDetails yyy")}>
                <p className={cx("NowTotalTitle")}>Tổng số tiền</p>
                <p className={cx("NowTotalQuantity")}>{totalQuantity}</p>
                <p className={cx("NowTotalProductTitle")}>sản phẩm</p>
              </div>
              <p className={cx("NowTotalAmount")}>
                {totalPayment.toLocaleString()} VNĐ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buyyy;
