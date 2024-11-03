import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./cart-ALL.module.scss";
import classnames from "classnames/bind";
import TextField from "@mui/material/TextField";
const cx = classnames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "80vh", // Giới hạn chiều cao để tạo không gian cho cuộn
  overflowY: "auto", // Kích hoạt cuộn dọc khi nội dung vượt quá chiều cao
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PendingOrder = () => {
  // Modal state
  const [open, setOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [query, setQuery] = useState("");
  // Fetch all orders
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/bookstore_api/api/orders"
        );
        setOrders(response.data);
      } catch (err) {
        setError("Error fetching orders: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Fetch order details by userId and orderId
  const fetchOrderDetails = async (userId, orderId) => {
    try {
      console.log(
        `Fetching order details for userId: ${userId}, orderId: ${orderId}`
      );
      const j = {
        jhd: 12,
        hfd: "jahjfd",
      };
      console.log(j);
      const response = await axios.get(
        `http://localhost:8080/bookstore_api/api/detailorder/${userId}/${orderId}`
      );

      console.log("API response data:", response.data); // Kiểm tra dữ liệu trả về từ API
      const orderDetails = response.data;
      console.log("Order details:", orderDetails);
      setOrderDetails(response.data);
      setOpen(true); // Mở modal sau khi nhận được dữ liệu
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("Error fetching order details: " + error.message);
    }
  };

  const handleOpenOrderDetails = (userId, orderId) => {
    setSelectedOrderId(orderId);
    fetchOrderDetails(userId, orderId);
  };

  const handleClose = () => {
    setOpen(false);
    setOrderDetails([]); // Clear details after modal is closed
  };
  // select pending
  const handleStatusChange = async (orderId, userId, newStatus) => {
    try {
      await axios.put("http://localhost:8080/bookstore_api/api/orders", {
        user_id: userId,
        order_id: orderId,
        status: newStatus,
      });
      const response = await axios.get(
        "http://localhost:8080/bookstore_api/api/orders"
      );
      setOrders(response.data);
    } catch (err) {
      setError("Error updating order status: " + err.message);
    }
  };
  const pendingOrders = orders.filter((order) => order.status === "pending");
  const filteredAndSortedRows = pendingOrders
    .filter((order) => {
      const queryLower = query.toLowerCase();
      return (
        // Tìm theo user_id
        order.orderId && order.orderId.toString().includes(queryLower) // Tìm theo orderId
      );
    })
    .sort((a, b) => {
      const queryLower = query.toLowerCase();
      const aStartsWith =
        // Sắp xếp theo user_id
        a.orderId && a.orderId.toString().startsWith(queryLower); // Sắp xếp theo orderId
      const bStartsWith =
        b.orderId && b.orderId.toString().startsWith(queryLower);

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      // Nếu không bắt đầu với query, so sánh vị trí của query trong user_id và orderId
      return b.user_id ? b.user_id.toString().indexOf(queryLower) : Infinity;
    });
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <div className={cx("adssmsssssssin-tssbs")}>
      <h1>Danh sách đơn hàng</h1>
      <TextField
        className={cx("input_product_search")}
        id="outlined-basic"
        label="Tìm kiếm user_id hoặc order_id"
        variant="outlined"
        value={query} // Bind the input value to query state
        onChange={handleSearchChange}
        InputLabelProps={{
          style: { fontSize: 13, fontWeight: 550 }, // Set font size and font weight for label
        }} // Update query on input change
      />
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <ul>
        {filteredAndSortedRows.map((order) => (
          <li className={cx("admsssin-tab")} key={order.orderId}>
            <p>Order ID: {order.orderId}</p>
            <p>Ngày đặt: {order.dateOrder}</p>
            <p>Tổng giá: {order.totalPrice}</p>
            <p>Trạng thái: {order.status}</p>
            <p>Địa chỉ giao hàng: {order.shippingAddress}</p>
            <p>User ID: {order.user_id}</p>
            <button
              onClick={() =>
                handleOpenOrderDetails(order.user_id, order.orderId)
              }
              className={cx("btn")}
            >
              Xem Chi Tiết Đơn Hàng
            </button>
            <select
              className={cx("select_width")}
              value={order.status}
              onChange={(e) =>
                handleStatusChange(order.orderId, order.user_id, e.target.value)
              }
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </li>
        ))}
      </ul>

      {/* Modal for order details */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chi tiết đơn hàng
          </Typography>

          {orderDetails && orderDetails.length > 0 ? (
            <ul>
              {orderDetails.map((product) => (
                <li key={product.orderId}>
                  <img
                    src={product.image}
                    alt={`Hình ảnh của ${product.totalPrice}`}
                    width="100"
                  />
                  <div>
                    <p>
                      <strong>Sản phẩm:</strong> {product.productName}
                    </p>
                    <p>
                      <strong>Thể loại:</strong> {product.categoryName}
                    </p>
                    <p>
                      <strong>Số lượng:</strong> {product.quantity}
                    </p>
                    <p>
                      <strong>Giá:</strong> {product.price.toLocaleString()} VND
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có chi tiết đơn hàng.</p>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PendingOrder;
