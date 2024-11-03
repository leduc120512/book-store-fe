import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import classnames from "classnames/bind";
import styles from "../Product_Management/Product_manager-module.scss";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const cx = classnames.bind(styles);
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const style = {
  position: "absolute",
  top: "0%",
  left: "18%",
};
export default function CustomizedTables() {
  const [newName, setNewName] = useState("");
  const [newdescription, setNewdescription] = useState("");
  const [newimage, setNewimage] = useState("");
  const [newprice, setNewprice] = useState("");
  const [newstock, setNewstock] = useState("");
  const [newsold, setNewsold] = useState("");
  const [newcategoryName, setNewcategoryName] = useState("");
  const [catagory, setcatagory] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [catagorynameupdate, newcatagorynameupdate] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/bookstore_api/api/Category/")
      .then((response) => response.json())
      .then((json) => newcatagorynameupdate(json));
  }, []);

  // api
  const [products, setproducts] = useState([]);
  // modal add new
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // catagory
  useEffect(() => {
    fetch("http://localhost:8080/bookstore_api/api/Category")
      .then((response) => response.json())
      .then((json) => setcatagory(json));
  }, []);

  // modal update
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = (product) => {
    setSelectedProduct(product);
    setOpen1(true);
  };

  const handleClose1 = () => setOpen1(false);
  // api
  useEffect(() => {
    fetch("http://localhost:8080/bookstore_api/api/products")
      .then((response) => response.json())
      .then((json) => setproducts(json));
  }, []);

  const addUser = () => {
    const name = newName.trim();
    const description = newdescription.trim();
    const image = newimage.trim();
    const price = newprice.trim();
    const stock = newstock.trim();
    const sold = newsold.trim();
    const categoryName = newcategoryName.trim();
    if (price <= 0 || stock <= 0 || sold <= 0) {
      Swal.fire({
        icon: "Lỗi",
        title: "Hãy nhập sản phẩm mới là số lớn hơn 0",
        text: "Something went wrong!",
      });
      setOpen(false);
      return;
    }
    if (
      name &&
      description &&
      image &&
      price &&
      stock &&
      sold &&
      categoryName
    ) {
      fetch("http://localhost:8080/bookstore_api/api/products", {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          image,
          price,
          stock,
          sold,
          categoryName,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setproducts([...products, data]);
          setNewName("");
          setNewdescription("");
          setNewimage("");
          setNewprice("");
          setNewstock("");
          setNewsold("");
          setNewcategoryName("");
          setOpen(false);
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
          });
        });
    }
  };

  // delete
  const deleteUser = (productId) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Xóa",
      denyButtonText: "Không xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/bookstore_api/api/products/${productId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(() => {
            setproducts((values) => {
              return values.filter((item) => item.productId !== productId);
            });
            setOpen(false);
            Swal.fire({
              title: "Thành công!",
              text: "Sản phẩm đã được xóa.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Lỗi!",
              text: "Có lỗi xảy ra khi xóa sản phẩm.",
              icon: "error",
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Sản phẩm không bị xóa", "", "info");
      }
    });
  };

  const onChangeHandler = (key, value) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [key]: value,
    }));
  };
  const updateUser = () => {
    fetch(
      `http://localhost:8080/bookstore_api/api/products/${selectedProduct.productId}`,
      {
        method: "PUT",
        body: JSON.stringify(selectedProduct),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setOpen1(false);
        Swal.fire({
          title: "Good job!",
          text: "Product updated successfully!",
          icon: "success",
        }).then(() => {
          // Close the modal after the alert is confirmed
          setOpen1(false);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an issue updating the product.",
          icon: "error",
        });
      });
  };
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  // search
  const filteredAndSortedRows = products
    .filter((product) => {
      const queryLower = query.toLowerCase();
      return (
        (product.name && product.name.toLowerCase().includes(queryLower)) ||
        (product.productId &&
          product.productId.toString().includes(queryLower)) ||
        (product.categoryName &&
          product.categoryName.toLowerCase().includes(queryLower))
      );
    })
    .sort((a, b) => {
      const queryLower = query.toLowerCase();
      const aStartsWith =
        (a.name && a.name.toLowerCase().startsWith(queryLower)) ||
        (a.productId && a.productId.toString().startsWith(queryLower)) ||
        (a.categoryName && a.categoryName.toLowerCase().startsWith(queryLower));
      const bStartsWith =
        (b.name && b.name.toLowerCase().startsWith(queryLower)) ||
        (b.productId && b.productId.toString().startsWith(queryLower)) ||
        (b.categoryName && b.categoryName.toLowerCase().startsWith(queryLower));

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      return (
        (a.name ? a.name.toLowerCase().indexOf(queryLower) : Infinity) -
        (b.name ? b.name.toLowerCase().indexOf(queryLower) : Infinity)
      );
    });
  return (
    <div>
      <div className={cx("main_btn_add")}>
        <TextField
          className={cx("input_product_search")}
          id="outlined-basic"
          label="Tìm Kiếm Theo tên hoặc id sản phẩm"
          variant="outlined"
          value={query} // Bind the input value to query state
          onChange={handleSearchChange}
          InputLabelProps={{
            style: { fontSize: 13, fontWeight: 550 }, // Set font size and font weight for label
          }}
        />
        <button onClick={handleOpen} type="button" className={cx("button")}>
          <span className={cx("fold")}></span>

          <div className={cx("points_wrapper")}>
            <i className={cx("point")}></i>
            <i className={cx("point")}></i>
            <i className={cx("point")}></i>
            <i className={cx("point")}></i>
            <i className={cx("point")}></i>
            <i className={cx("point")}></i>
            <i className={cx("point")}></i>
            <i className={cx("point")}></i>
            <i className={cx("point")}></i>
            <i className={cx("point")}></i>
          </div>

          <span className={cx("inner")}>
            <svg
              className={cx("icon")}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            >
              <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37"></polyline>
            </svg>
            Thêm sản phẩm
          </span>
        </button>
      </div>
      <TableContainer className={cx("modal_table_product")} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <p>Id</p>
              </StyledTableCell>
              <StyledTableCell>
                <p>Tên</p>
              </StyledTableCell>
              <StyledTableCell align="right">
                <p>Hình ảnh</p>
              </StyledTableCell>
              <StyledTableCell align="right">
                <p>Giá</p>
              </StyledTableCell>
              <StyledTableCell align="right">
                <p>Còn hàng</p>
              </StyledTableCell>
              <StyledTableCell align="right">
                <p>Thể Loại</p>
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedRows.map((product) => (
              <StyledTableRow key={product.productId}>
                <StyledTableCell component="th" scope="row">
                  {product.productId}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {product.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <img className={cx("img_product")} src={product.image} />
                </StyledTableCell>
                <StyledTableCell align="right">{product.price}</StyledTableCell>
                <StyledTableCell align="right">{product.stock}</StyledTableCell>
                <StyledTableCell align="right">
                  {product.categoryName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div className={cx("main_edit")}>
                    <button
                      onClick={() => handleOpen1(product)}
                      className={cx("Btn")}
                    >
                      Edit
                      <svg className={cx("svg")} viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteUser(product.productId)}
                      className={cx("Btn")}
                    >
                      Delete
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 39 7"
                        className={cx("bin-top")}
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
                        className={cx("bin-bottom")}
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
                        className={cx("garbage")}
                      >
                        <path
                          fill="white"
                          d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    {/* const [newName, setNewName] = useState(""); const
                    [newdescription, setNewdescription] = useState(""); const
                    [newimage, setNewimage] = useState(""); const [newprice,
                    setNewprice] = useState(""); const [newstock, setNewstock] =
                    useState(""); const [newsold, setNewsold] = useState("");
                    const [newcategoryName, setNewcategoryName] = useState(""); */}
                    <Box sx={style} className={cx("main_edit_product")}>
                      <div className={cx("container")}>
                        <div className={cx("form_area")}>
                          <p className={cx("title")}>SIGN UP</p>
                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")} htmlFor="name">
                              Name
                            </label>
                            <input
                              placeholder="Nhập tên sản phẩm"
                              className={cx("form_style")}
                              type="text"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                            />
                          </div>
                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")} htmlFor="name">
                              Mô tả
                            </label>
                            <input
                              placeholder="Nhập mô tả"
                              className={cx("form_style")}
                              type="text"
                              value={newdescription}
                              onChange={(e) =>
                                setNewdescription(e.target.value)
                              }
                            />
                          </div>
                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")} htmlFor="name">
                              Hình ảnh
                            </label>
                            <input
                              placeholder="Nhập hình ảnh"
                              className={cx("form_style")}
                              type="text"
                              value={newimage}
                              onChange={(e) => setNewimage(e.target.value)}
                            />
                          </div>
                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")} htmlFor="name">
                              Giá
                            </label>
                            <input
                              placeholder="Nhập giá"
                              className={cx("form_style")}
                              type="text"
                              value={newprice}
                              onChange={(e) => setNewprice(e.target.value)}
                            />
                          </div>
                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")} htmlFor="name">
                              Số lượng còn hàng
                            </label>
                            <input
                              placeholder="Nhập số lượng còn hàng"
                              className={cx("form_style")}
                              type="text"
                              value={newstock}
                              onChange={(e) => setNewstock(e.target.value)}
                            />
                          </div>
                          {/* const [newsold, setNewsold] = useState(""); const
                          [newcategoryName, setNewcategoryName] = useState("");
                          */}
                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")} htmlFor="name">
                              Đã bán
                            </label>
                            <input
                              placeholder="Đã bán"
                              className={cx("form_style")}
                              type="text"
                              value={newsold}
                              onChange={(e) => setNewsold(e.target.value)}
                            />
                          </div>
                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")} htmlFor="email">
                              Chọn thể loại
                            </label>

                            <select
                              className={cx("form_style")}
                              value={newcategoryName}
                              onChange={(e) =>
                                setNewcategoryName(e.target.value)
                              }
                            >
                              {catagory.map((catagorys) => (
                                <option
                                  key={catagorys.Categories}
                                  value={catagorys.Categories}
                                >
                                  {catagorys.Categories_name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <button onClick={addUser} className={cx("btn")}>
                              Thêm sản phẩm
                            </button>
                            <button onClick={addUser} className={cx("btn")}>
                              Thoát
                            </button>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                  <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box className={cx("main_edit_product")} sx={style}>
                      <div className={cx("container")}>
                        <div className={cx("form_area")}>
                          <p className={cx("title")}>Sửa</p>

                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")} htmlFor="name">
                              Name
                            </label>
                            <input
                              placeholder="Enter your full name"
                              className={cx("form_style")}
                              value={selectedProduct?.name || ""}
                              onChange={(e) =>
                                onChangeHandler("name", e.target.value)
                              }
                            />
                          </div>
                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")} htmlFor="name">
                              image
                            </label>
                            <input
                              placeholder="Enter your full name"
                              className={cx("form_style")}
                              value={selectedProduct?.image || ""}
                              onChange={(e) =>
                                onChangeHandler("image", e.target.value)
                              }
                            />
                          </div>
                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")} htmlFor="name">
                              stock
                            </label>
                            <input
                              placeholder="Enter your full name"
                              className={cx("form_style")}
                              value={selectedProduct?.stock || ""}
                              onChange={(e) =>
                                onChangeHandler("stock", e.target.value)
                              }
                            />
                          </div>
                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")}>
                              Description
                            </label>
                            <input
                              placeholder="Enter your description"
                              className={cx("form_style")}
                              value={selectedProduct?.description || ""}
                              onChange={(e) =>
                                onChangeHandler("description", e.target.value)
                              }
                            />
                          </div>
                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")}>Price</label>

                            <input
                              placeholder="Enter your price"
                              className={cx("form_style")}
                              value={selectedProduct?.price || ""}
                              onChange={(e) =>
                                onChangeHandler("price", e.target.value)
                              }
                            />
                          </div>
                          <div className={cx("form_group")}>
                            <label className={cx("sub_title")}>Category</label>
                            <select
                              className={cx("form_style")}
                              onChange={(e) =>
                                onChangeHandler("categoryName", e.target.value)
                              }
                            >
                              {catagorynameupdate.map((category) => (
                                <option
                                  key={category.Categories}
                                  value={category.Categories} // Giá trị là category_id
                                >
                                  {category.Categories_name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={updateUser}
                              className={cx("btn")}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
