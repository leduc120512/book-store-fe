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
import styles from "../admin-module.scss";
import classnames from "classnames/bind";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
// Hàm cập nhật mật khẩu

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/bookstore_api/api/admin/user")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);
  // search
  const filteredAndSortedRows = users
    .filter((user) => {
      const queryLower = query.toLowerCase();
      return (
        (user.nameUser && user.nameUser.toLowerCase().includes(queryLower)) ||
        (user.userName && user.userName.toLowerCase().includes(queryLower)) ||
        (user.phone && user.phone.toLowerCase().includes(queryLower))
      );
    })
    .sort((a, b) => {
      const queryLower = query.toLowerCase();
      const aStartsWith =
        (a.nameUser && a.nameUser.toLowerCase().startsWith(queryLower)) ||
        (a.userName && a.userName.toLowerCase().startsWith(queryLower)) ||
        (a.phone && a.phone.toLowerCase().startsWith(queryLower));
      const bStartsWith =
        (b.nameUser && b.nameUser.toLowerCase().startsWith(queryLower)) ||
        (b.userName && b.userName.toLowerCase().startsWith(queryLower)) ||
        (b.phone && b.phone.toLowerCase().startsWith(queryLower));

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      return (
        (a.nameUser ? a.nameUser.toLowerCase().indexOf(queryLower) : Infinity) -
        (b.nameUser ? b.nameUser.toLowerCase().indexOf(queryLower) : Infinity)
      );
    });

  // delete user
  const deleteUser = (id) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        fetch(`http://localhost:8080/bookstore_api/api/admin/user3/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              // Xử lý lỗi nếu server trả về lỗi
              throw new Error(
                `Failed to delete user with status: ${response.status}`
              );
            }
            return response; // Không cần gọi response.json() nếu DELETE không trả về body
          })
          .then(() => {
            setUsers((values) => values.filter((item) => item.id !== id));
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const handleEditUser = async (userId) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
    });

    // Handle the user's response
    if (result.isConfirmed) {
      // Proceed with saving changes
      Swal.fire("Saved!", "", "success");

      // Update selected users state
      setSelectedUsers((prevSelected) => {
        return prevSelected.includes(userId)
          ? prevSelected.filter((id) => id !== userId) // Deselect if already selected
          : [...prevSelected, userId]; // Select if not already selected
      });

      // Attempt to update password
      try {
        const response = await fetch(
          `http://localhost:8080/bookstore_api/api/admin/user3/${userId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: "newPassword" }), // Ensure this matches your API requirements
          }
        );

        if (response.ok) {
        } else {
          const errorData = await response.json(); // Get error details from response
          alert(
            `Failed to update password for user ${userId}: ${
              errorData.message || "Unknown error"
            }`
          );
        }
      } catch (error) {
        console.error(`Error updating password for user ${userId}:`, error);
        alert(`Error updating password for user ${userId}: ${error.message}`);
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  return (
    <div className={cx("main_user_list")}>
      <div className={cx("main_user_list_input")}>
        <TextField
          placeholder="Tìm kiếm theo tên, username hoặc phone"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cx("input_user")}
          id="outlined-basic"
          label="Tìm kiếm theo tên, username hoặc phone"
          variant="outlined"
          InputLabelProps={{
            style: { fontSize: 13, fontWeight: 550 }, // Set font size and font weight for label
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {" "}
              <StyledTableCell>
                <p>Id</p>
              </StyledTableCell>
              <StyledTableCell>
                <p>Tên</p>
              </StyledTableCell>
              <StyledTableCell align="right">
                <p>Gmail</p>
              </StyledTableCell>
              <StyledTableCell align="right">
                <p>Điện thoại</p>
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedRows.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {user.nameUser}
                </StyledTableCell>
                <StyledTableCell align="right">{user.userName}</StyledTableCell>
                <StyledTableCell align="right">{user.phone}</StyledTableCell>
                <StyledTableCell align="right">
                  <div className={cx("main_edit")}>
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className={cx("Btn")}
                    >
                      Edit
                      <svg className={cx("svg")} viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className={cx("Btn", "oeuf")}
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
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
